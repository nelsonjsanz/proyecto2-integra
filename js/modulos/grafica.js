// js/modulos/grafica.js

let board = null;
let objetosDinamicos = [];
let pistaActiva = false;

let estadoActual = {
    fn: (x) => x * x,
    a: 0,
    b: 3,
    esImpropia: false,
    formulaTexto: "x^2",
    valorReal: 0
};

export function extraerDatosIntegral(ejercicio) {
    if (!ejercicio) return estadoActual;

    if (Array.isArray(ejercicio.casos) && ejercicio.casos.length > 0) {
        const latex = ejercicio.casos[0];
        const matchLimites = latex.match(/\\int_\{?([^}^\\]+)\}?^\{\\?([^}]+)\}/);

        let a = 0;
        let b = 3;
        let esImpropia = false;

        if (matchLimites) {
            a = parseFloat(matchLimites[1]) || 0;
            const limSup = matchLimites[2].trim();
            if (limSup.includes("infty")) {
                esImpropia = true;
                b = a + 4;
            } else if (limSup.includes("pi")) {
                b = Math.PI;
            } else {
                b = parseFloat(limSup) || (a + 3);
            }
        }

        const matchFn = latex.match(/\\left\((.+?)\\right\)/);
        const exprInterior = matchFn ? matchFn[1] : "x^2";
        const fn = crearFuncionEvaluadora(exprInterior);
        const valorRes = ejercicio.resultados?.answer20?.valorCorrecto || "";

        return {
            fn,
            a,
            b,
            esImpropia,
            formulaTexto: exprInterior,
            valorReal: parsearValorResultado(valorRes, fn, a, b, esImpropia)
        };
    }

    const a = ejercicio.a ?? ejercicio.intervalo?.[0] ?? 0;
    const b = ejercicio.b ?? ejercicio.intervalo?.[1] ?? 2;
    const expr = ejercicio.funcion || ejercicio.enunciado || "x^2";
    const fn = typeof ejercicio.fn === "function" ? ejercicio.fn : crearFuncionEvaluadora(expr);

    return {
        fn,
        a,
        b,
        esImpropia: false,
        formulaTexto: expr,
        valorReal: parseFloat(ejercicio.solucion) || calcularIntegralNumerica(fn, a, b)
    };
}

function crearFuncionEvaluadora(latexStr) {
    let limpia = latexStr
        .replace(/\\mathrm\{d\}x/g, "")
        .replace(/\\left|\\right/g, "")
        .replace(/\\sin|\bsin\b|\bsen\b/g, "Math.sin")
        .replace(/\\cos|\bcos\b/g, "Math.cos")
        .replace(/\\tan|\btan\b/g, "Math.tan")
        .replace(/e\^\{?x\}?/g, "Math.exp(x)")
        .replace(/x\^\{?(\d+)\}?/g, "(Math.pow(x, $1))")
        .replace(/(\d+)\s*x/g, "($1 * x)");

    return (x) => {
        try {
            const fnTemp = new Function("x", `return ${limpia};`);
            const res = fnTemp(x);
            return Number.isFinite(res) ? res : 0;
        } catch {
            return x * x;
        }
    };
}

function calcularIntegralNumerica(fn, a, b, n = 200) {
    const h = (b - a) / n;
    let suma = 0.5 * (fn(a) + fn(b));
    for (let i = 1; i < n; i++) {
        suma += fn(a + i * h);
    }
    return suma * h;
}

function parsearValorResultado(str, fn, a, b, esImpropia) {
    if (esImpropia || str.includes("infty")) return Infinity;
    const matchFrac = str.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    if (matchFrac) return parseFloat(matchFrac[1]) / parseFloat(matchFrac[2]);
    const num = parseFloat(str);
    return Number.isFinite(num) ? num : calcularIntegralNumerica(fn, a, b);
}

function limpiarObjetosDinamicos() {
    if (!board) return;
    board.suspendUpdate();
    while (objetosDinamicos.length > 0) {
        const obj = objetosDinamicos.pop();
        board.removeObject(obj);
    }
    board.unsuspendUpdate();
}

function actualizarBannerInfo(mensaje, color = "#334155") {
    const info = document.getElementById("info-grafica");
    if (info) {
        info.style.color = color;
        info.innerHTML = mensaje;
    }
}

export function iniciar(ejercicioOApp) {
    let contenedor = document.getElementById("box");
    if (!contenedor) {
        const mainContent = document.querySelector(".main-content") || document.body;
        const tarjetaGrafica = document.createElement("div");
        tarjetaGrafica.className = "card";
        tarjetaGrafica.style.marginTop = "20px";
        tarjetaGrafica.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                <h2 class="section-title" style="margin:0;">Gráfica Interactiva (JSXGraph)</h2>
                <div style="display:flex; gap:8px;">
                    <button id="btn-pista-riemann" type="button" class="btn-validar" style="cursor:pointer;">Pista: Rectángulos de Riemann</button>
                </div>
            </div>
            <div id="info-grafica" style="font-size:0.95rem; margin-bottom:10px; font-weight:500; color:#334155;"></div>
            <div id="box" class="jxgbox" style="width:100%; height:400px; border-radius:10px; border:1px solid #cbd5e1;"></div>
        `;
        mainContent.appendChild(tarjetaGrafica);

        const btnPista = document.getElementById("btn-pista-riemann");
        if (btnPista) {
            btnPista.addEventListener("click", () => mostrarPista());
        }
    }

    const ejercicio = ejercicioOApp?.ejercicio || ejercicioOApp;
    estadoActual = extraerDatosIntegral(ejercicio);
    pistaActiva = false;

    dibujarBase();
}

function calcularBoundingBox(fn, a, b) {
    let yMin = 0;
    let yMax = 0;
    const pasos = 40;
    const dx = (b - a) / pasos;

    for (let i = 0; i <= pasos; i++) {
        const y = fn(a + i * dx);
        if (Number.isFinite(y)) {
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
        }
    }

    const margenX = Math.max(1.2, (b - a) * 0.35);
    const altoY = Math.max(4, yMax - yMin);
    return [
        a - margenX,
        yMax + altoY * 0.4,
        b + margenX,
        Math.min(-altoY * 0.22, yMin - altoY * 0.2)
    ];
}

export function dibujarBase() {
    const { fn, a, b, esImpropia, formulaTexto } = estadoActual;
    const bbox = calcularBoundingBox(fn, a, b);

    if (board) {
        JXG.JSXGraph.freeBoard(board);
    }
    objetosDinamicos = [];

    board = JXG.JSXGraph.initBoard("box", {
        boundingbox: bbox,
        axis: true,
        showCopyright: false,
        showNavigation: true,
        pan: { enabled: true },
        zoom: { wheel: true }
    });

    board.create("functiongraph", [fn], {
        strokeColor: "#2563eb",
        strokeWidth: 3,
        name: `f(x) = ${formulaTexto}`,
        withLabel: true,
        label: { position: "top", offset: [10, 10], color: "#1e40af" }
    });

    board.create("point", [a, 0], {
        name: `a = ${a}`,
        size: 3,
        fillColor: "#0f172a",
        strokeColor: "#0f172a",
        fixed: true
    });

    board.create("point", [b, 0], {
        name: esImpropia ? "b → ∞" : `b = ${Number(b.toFixed(2))}`,
        size: 3,
        fillColor: "#0f172a",
        strokeColor: "#0f172a",
        fixed: true
    });

    if (esImpropia) {
        actualizarBannerInfo(
            `Integral impropia en [${a}, ∞). Se muestra la región acotada hasta x = ${b}; el área crece sin límite (∞).`,
            "#b45309"
        );
    } else {
        actualizarBannerInfo(
            `Intervalo de integración: [${a}, ${Number(b.toFixed(2))}]. Usa el botón de pista para estimar el área con rectángulos de Riemann.`
        );
    }
}

export function mostrarPista() {
    if (!board) return;
    limpiarObjetosDinamicos();

    if (pistaActiva) {
        pistaActiva = false;
        actualizarBannerInfo("Pista oculta. Resuelve los pasos o vuelve a activar los rectángulos de Riemann.");
        return;
    }

    pistaActiva = true;
    const { fn, a, b, esImpropia } = estadoActual;
    const bbox = board.getBoundingBox();

    board.suspendUpdate();

    const xIni = bbox[0] + (bbox[2] - bbox[0]) * 0.06;
    const xFin = bbox[0] + (bbox[2] - bbox[0]) * 0.42;
    const yPos = bbox[1] - (bbox[1] - bbox[3]) * 0.1;

    const sliderN = board.create("slider", [
        [xIni, yPos],
        [xFin, yPos],
        [1, 6, 40]
    ], {
        name: "n",
        snapWidth: 1,
        precision: 0,
        strokeColor: "#0f172a",
        fillColor: "#f59e0b"
    });

    const sumaRiemann = board.create("riemannsum", [
        fn,
        () => sliderN.Value(),
        "middle",
        a,
        b
    ], {
        fillColor: "#f59e0b",
        fillOpacity: 0.35,
        strokeColor: "#d97706",
        strokeWidth: 1
    });

    const textoRiemann = board.create("text", [
        xIni,
        yPos - (bbox[1] - bbox[3]) * 0.08,
        () => `Aproximación Riemann (n = ${sliderN.Value()}): ${sumaRiemann.Value().toFixed(2)}`
    ], {
        fontSize: 13,
        strokeColor: "#92400e",
        fixed: true
    });

    objetosDinamicos.push(sliderN, sumaRiemann, textoRiemann);
    board.unsuspendUpdate();

    actualizarBannerInfo(
        esImpropia
            ? `Pista activa: Mueve el slider n. En [${a}, ${b}] suma ≈ ${sumaRiemann.Value().toFixed(2)}, pero hacia +∞ diverge a ∞.`
            : "Pista activa: Mueve el deslizador 'n' en la gráfica para ver cómo los rectángulos de Riemann aproximan el área bajo la curva.",
        "#b45309"
    );
}

export function mostrarRespuesta(appOEjercicio, respuestaEstudiante, resultadoObj) {
    if (!board) return;
    limpiarObjetosDinamicos();
    pistaActiva = false;

    const { fn, a, b, valorReal, esImpropia } = estadoActual;
    const aprobado = resultadoObj?.ok ?? resultadoObj?.aprobado ?? false;
    const colorArea = aprobado ? "#28a745" : "#dc3545";

    board.suspendUpdate();

    const curvaOculta = board.create("functiongraph", [fn], { visible: false });
    const integralSombreada = board.create("integral", [[a, b], curvaOculta], {
        color: colorArea,
        fillOpacity: 0.35,
        curveLeft: { visible: true, size: 3, strokeColor: colorArea, fillColor: colorArea },
        curveRight: { visible: true, size: 3, strokeColor: colorArea, fillColor: colorArea },
        withLabel: false
    });

    objetosDinamicos.push(curvaOculta, integralSombreada);

    const valorEst = extraerNumeroEstudiante(respuestaEstudiante);
    if (!aprobado && Number.isFinite(valorEst) && !esImpropia && (b - a) > 0) {
        const alturaMediaEst = valorEst / (b - a);
        const rectanguloComparativo = board.create("polygon", [
            [a, 0],
            [b, 0],
            [b, alturaMediaEst],
            [a, alturaMediaEst]
        ], {
            fillColor: "#6366f1",
            fillOpacity: 0.22,
            borders: { strokeColor: "#4f46e5", dash: 2, strokeWidth: 2 },
            vertices: { visible: false }
        });
        objetosDinamicos.push(rectanguloComparativo);
    }

    board.unsuspendUpdate();

    if (aprobado) {
        const textoValor = esImpropia ? "∞" : Number(valorReal.toFixed(2));
        actualizarBannerInfo(
            `¡Correcto! El área sombreada en verde representa la integral definida con valor exacto = ${textoValor}.`,
            "#15803d"
        );
    } else {
        actualizarBannerInfo(
            "Respuesta incorrecta en la validación. Se muestra en rojo el área bajo la curva del intervalo para que verifiques tu cálculo.",
            "#b91c1c"
        );
    }
}

function extraerNumeroEstudiante(str) {
    if (!str || typeof str !== "string") return NaN;
    const matchIgual = str.split("=").pop() || str;
    const matchFrac = matchIgual.match(/\\frac\{(-?\d+(?:\.\d+)?)\}\{(-?\d+(?:\.\d+)?)\}/);
    if (matchFrac) {
        return parseFloat(matchFrac[1]) / parseFloat(matchFrac[2]);
    }
    const limpio = matchIgual.replace(/[^0-9.-]/g, "");
    return parseFloat(limpio);
}