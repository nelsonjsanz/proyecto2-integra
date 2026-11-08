import {Banco} from "./modulos/banco.js"
import { numeroAleatorio } from "./modulos/funciones.js"
import { evaluar } from "./modulos/correccion.js"

const formulario = document.querySelector("#formulario");
let rand = numeroAleatorio(1,Banco.length)
let caso_estudio = document.getElementById("caso_estudio")
let math_integral = Banco[rand - 1]

math_integral.casos.forEach((element,y) => {
    let mfe = new MathfieldElement();
    mfe.value = element;
    const clonedFormulario = formulario.content.cloneNode(true);
    clonedFormulario.getElementById("label").textContent = y == 0 ? "Integral:" : `Paso: ${y}`
    clonedFormulario.getElementById("formula").appendChild(mfe)
    let {text, boton, formula} = math_integral.guia[y]
    clonedFormulario.getElementById("formula_guia").innerHTML = formula
    clonedFormulario.getElementById("guia").textContent = text
    if (!boton){
        clonedFormulario.querySelector(".btn-validar").hidden = true
    }
    caso_estudio.appendChild(clonedFormulario);
});

document.querySelectorAll(".btn-validar").forEach(function(boton) {
    boton.addEventListener('click', function() {
        let resp = this.parentElement.parentElement.children[1].children[0].value
        let evaluacion = evaluar(resp,math_integral)
        if (evaluacion.aprobado) {
            this.parentElement.parentElement.style.borderColor = "#28a745";
            this.parentElement.parentElement.style.borderWidth = "2px";
            this.parentElement.parentElement.style.borderStyle = "solid";
        } else {
            this.parentElement.parentElement.style.borderColor = "#dc3545"; 
            this.parentElement.parentElement.style.borderWidth = "2px";
            this.parentElement.parentElement.style.borderStyle = "solid";
        }
        console.log(evaluacion)
    });
});