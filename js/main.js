import { ejercicioAleatorio, configurarTecladoVirtual } from "./modulos/funciones.js";
import { evaluar } from "./modulos/correccion.js";
import { iniciar as iniciarGrafica, mostrarRespuesta } from "./modulos/grafica.js";

configurarTecladoVirtual();

const formulario = document.querySelector("#formulario");
let nivel = 1;
let math_integral = ejercicioAleatorio(nivel);
let caso_estudio = document.getElementById(`caso_estudio_${nivel}`);

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

iniciarGrafica(math_integral, nivel);

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

document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".card-niveles .card-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const cardNivel = header.closest(".card-niveles");
            
            document.querySelectorAll(".card-niveles").forEach(card => {
                if (card !== cardNivel) card.classList.remove("active");
            });

            cardNivel.classList.toggle("active");
        });
    });
});