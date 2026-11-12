// js/modulos/grafica.js

let board = null;
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
    }

    const ejercicio = ejercicioOApp?.ejercicio || ejercicioOApp;
    estadoActual = extraerDatosIntegral(ejercicio);
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
}