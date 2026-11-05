import {Banco} from "./modulos/banco.js"
import { numeroAleatorio } from "./modulos/funciones.js"

const formulario = document.querySelector("#formulario");
let rand = 1 //numeroAleatorio(1,Banco.length)
let caso_estudio = document.getElementById("caso_estudio")
let math_integral = Banco[rand - 1]

math_integral.casos.forEach((element,y) => {
    let mfe = new MathfieldElement();
    mfe.value = element;
    const clonedFormulario = formulario.content.cloneNode(true);
    clonedFormulario.getElementById("label").textContent = y == 0 ? "Integral:" : `Paso: ${y}`
    clonedFormulario.getElementById("formula").appendChild(mfe)
    if (y > 0){
        let nodo = math_integral.guia[ y - 1].formula
        clonedFormulario.getElementById("formula_guia").innerHTML = nodo
        clonedFormulario.getElementById("guia").textContent = math_integral.guia[y-1].text
    }

    caso_estudio.appendChild(clonedFormulario);
});


