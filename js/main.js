import { ComputEngine } from "https://esm.run/@cortex-js/compute-engine";
import * as banco from "./modulos/banco.js";
import * as correccion from "./modulos/correccion.js";
import * as grafica from "./modulos/grafica.js";
import * as progreso from "./modulos/progreso.js";

const app = {
    ce: new ComputEngine(),
    board: JXG.JSXGraph.initBoard("box", { boundingbox: [-5, 5, 5, -5], axis: true })
};

console.log("Sistema inicializado correctamente");