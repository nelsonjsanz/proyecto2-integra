import { Banco } from "./modulos/banco.js";
import { numeroAleatorio } from "./modulos/funciones.js";
import { evaluar } from "./modulos/correccion.js";
import { iniciar as iniciarGrafica, mostrarRespuesta } from "./modulos/grafica.js";

function configurarTecladoVirtual() {
    if (!window.mathVirtualKeyboard) return;

    window.mathVirtualKeyboard.layouts = [
        {
            label: "Números",
            tooltip: "Números y operaciones",
            rows: [
                ["1", "2", "3", "4", "5", { latex: "\\leftarrow", command: ["performWithFeedback", "moveToPreviousChar"] }, { latex: "\\rightarrow", command: ["performWithFeedback", "moveToNextChar"] }],
                ["6", "7", "8", "9", "0", "\\frac{#@}{#?}", { latex: "\\backslash\\text{del}", command: ["performWithFeedback", "deleteBackward"] }],
                ["-", "+", "\\cdot", "/", ".", "(", ")"]
            ]
        },
        {
            label: "Variables y Potencias",
            tooltip: "Variables, exponentes e infinito",
            rows: [
                ["x", "x^2", "x^3", "x^{#?}", "#@^2", "#@^{#?}"],
                ["\\sin(x)", "\\cos(x)", "e^x", "\\pi", "\\infty", { latex: "\\backslash\\text{del}", command: ["performWithFeedback", "deleteBackward"] }]
            ]
        },
        {
            label: "Agrupaciones",
            tooltip: "Fracciones y paréntesis",
            rows: [
                ["(", ")", "[#?]", "\\frac{#@}{#?}", "\\sqrt{#0}"],
                ["0", "1", "2", "3", "4", "5", "\\infty"]
            ]
        }
    ];
}

configurarTecladoVirtual();

const formulario = document.querySelector("#formulario");
let rand = numeroAleatorio(1, Banco.length);
let caso_estudio = document.getElementById("caso_estudio");
let math_integral = Banco[rand - 1];

math_integral.casos.forEach((element, y) => {
    let mfe = new MathfieldElement();
    mfe.value = element;
    mfe.readOnly = true;
    mfe.mathVirtualKeyboardPolicy = "auto";

    mfe.addEventListener("focusin", () => {
        if (y > 0 && window.mathVirtualKeyboard) {
            window.mathVirtualKeyboard.show();
        }
    });

    const clonedFormulario = formulario.content.cloneNode(true);
    clonedFormulario.getElementById("label").textContent = y == 0 ? "Integral:" : `Paso: ${y}`;
    clonedFormulario.getElementById("formula").appendChild(mfe);
    let { text, boton, formula } = math_integral.guia[y];
    clonedFormulario.getElementById("formula_guia").innerHTML = formula;
    clonedFormulario.getElementById("guia").textContent = text;
    if (!boton) {
        clonedFormulario.querySelector(".btn-validar").hidden = true;
    }
    caso_estudio.appendChild(clonedFormulario);
});

iniciarGrafica(math_integral);

document.querySelectorAll(".btn-validar").forEach(function (boton) {
    boton.addEventListener("click", function () {
        let resp = this.parentElement.parentElement.children[1].children[0].value;
        let evaluacion = evaluar(resp, math_integral);
        if (evaluacion.aprobado) {
            this.parentElement.parentElement.style.borderColor = "#28a745";
            this.parentElement.parentElement.style.borderWidth = "2px";
            this.parentElement.parentElement.style.borderStyle = "solid";
        } else {
            this.parentElement.parentElement.style.borderColor = "#dc3545";
            this.parentElement.parentElement.style.borderWidth = "2px";
            this.parentElement.parentElement.style.borderStyle = "solid";
        }
        mostrarRespuesta(math_integral, resp, evaluacion);
        console.log(evaluacion);
    });
});