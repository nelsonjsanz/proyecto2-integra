const CLAVE_RECORD = "record";

const estadoProgreso = {
  puntaje: 0,
  record: 0,
  intentosMaximos: 2,
  intentosUsados: 0,
  pistaUsada: false,
  ejercicioActual: 1,
  totalEjercicios: 5,
  aciertos: 0,
  historial: [],
  resueltoEnEjercicio: false,
};

function leerRecordGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_RECORD);
    const numero = Number(guardado);
    return Number.isFinite(numero) && numero >= 0 ? numero : 0;
  } catch {
    return 0;
  }
}

function guardarRecord(nuevoPuntaje) {
  if (nuevoPuntaje > estadoProgreso.record) {
    estadoProgreso.record = nuevoPuntaje;
    try {
      localStorage.setItem(CLAVE_RECORD, String(estadoProgreso.record));
    } catch {
    }
  }
}

function obtenerContenedor() {
  return document.getElementById("panel-progreso");
}

function renderizarInterfaz() {
  const contenedor = obtenerContenedor();
  if (!contenedor) return;

  const intentosRestantes = Math.max(
    0,
    estadoProgreso.intentosMaximos - estadoProgreso.intentosUsados
  );
  const porcentajeBarra = Math.min(
    100,
    Math.round(((estadoProgreso.ejercicioActual - 1) / estadoProgreso.totalEjercicios) * 100)
  );

  contenedor.innerHTML = `
    <div class="progreso-barra-wrap" aria-label="Progreso de práctica">
      <div class="progreso-barra-header">
        <span>Ejercicio ${Math.min(estadoProgreso.ejercicioActual, estadoProgreso.totalEjercicios)} de ${estadoProgreso.totalEjercicios}</span>
        <span>${porcentajeBarra}%</span>
      </div>
      <div class="progreso-barra-track">
        <div class="progreso-barra-fill" style="width: ${porcentajeBarra}%;"></div>
      </div>
    </div>

    <div class="progreso-metricas">
      <div class="metrica-item">
        <span class="metrica-titulo">Puntaje</span>
        <strong class="metrica-valor" id="progreso-puntaje">${estadoProgreso.puntaje}</strong>
      </div>
      <div class="metrica-item">
        <span class="metrica-titulo">Récord</span>
        <strong class="metrica-valor" id="progreso-record">${estadoProgreso.record}</strong>
      </div>
      <div class="metrica-item">
        <span class="metrica-titulo">Intentos restantes</span>
        <strong class="metrica-valor" id="progreso-intentos">${intentosRestantes}</strong>
      </div>
    </div>

    <div class="progreso-pista-box">
      <button
        type="button"
        id="btn-pedir-pista"
        class="btn-pista"
        ${estadoProgreso.pistaUsada || estadoProgreso.resueltoEnEjercicio ? "disabled" : ""}
      >
        💡 Ver pista
      </button>
      <p id="texto-pista" class="progreso-pista-texto" aria-live="polite">
        ${estadoProgreso.pistaUsada ? "Pista: usa los rectángulos para estimar." : ""}
      </p>
    </div>

    <div id="progreso-feedback" class="progreso-feedback" role="status" aria-live="polite"></div>
  `;

  const btnPista = document.getElementById("btn-pedir-pista");
  if (btnPista) {
    btnPista.addEventListener("click", () => {
      usarPista();
    });
  }
}

function mostrarFeedback(tipo, icono, texto, solucionLatex = "", explicacionCorta = "") {
  const box = document.getElementById("progreso-feedback");
  if (!box) return;

  const detalleSolucion = solucionLatex
    ? `
      <div class="progreso-solucion-box">
        <p><strong>Respuesta correcta:</strong> <span class="solucion-latex">$$${solucionLatex}$$</span></p>
        ${explicacionCorta ? `<p class="progreso-explicacion">${explicacionCorta}</p>` : ""}
      </div>
    `
    : "";

  box.className = `progreso-feedback feedback-${tipo}`;
  box.innerHTML = `
    <div class="feedback-principal">
      <span class="feedback-icono" aria-hidden="true">${icono}</span>
      <span class="feedback-texto">${texto}</span>
    </div>
    ${detalleSolucion}
  `;
}

export function iniciar(app = {}) {
  estadoProgreso.record = leerRecordGuardado();
  estadoProgreso.puntaje = 0;
  estadoProgreso.ejercicioActual = 1;
  estadoProgreso.aciertos = 0;
  estadoProgreso.historial = [];

  if (typeof app.totalEjercicios === "number" && app.totalEjercicios > 0) {
    estadoProgreso.totalEjercicios = app.totalEjercicios;
  }

  prepararNuevoEjercicio();
}

export function prepararNuevoEjercicio() {
  estadoProgreso.intentosUsados = 0;
  estadoProgreso.pistaUsada = false;
  estadoProgreso.resueltoEnEjercicio = false;
  renderizarInterfaz();
}

export function usarPista() {
  if (estadoProgreso.pistaUsada || estadoProgreso.resueltoEnEjercicio) return;
  estadoProgreso.pistaUsada = true;
  renderizarInterfaz();
  mostrarFeedback(
    "info",
    "ℹ️",
    "Pista activada: usa los rectángulos para estimar. Si aciertas, sumará un poco menos de puntos."
  );
}

export function registrar(app, resultado) {
  if (!resultado || estadoProgreso.resueltoEnEjercicio) return;

  if (resultado.valida === false) {
    mostrarFeedback(
      "aviso",
      "⚠️",
      resultado.mensaje || "Revisa tu respuesta antes de gastar un intento."
    );
    return;
  }

  estadoProgreso.intentosUsados += 1;

  const ejercicio = app?.ejercicio || {};
  const solucionLatex = ejercicio.solucion || "";
  const explicacionCorta =
    ejercicio.explicacion ||
    "Evalúa la antiderivada en el límite superior y réstale el valor en el límite inferior.";

  if (resultado.ok) {
    estadoProgreso.resueltoEnEjercicio = true;
    estadoProgreso.aciertos += 1;

    const puntosGanados = estadoProgreso.pistaUsada ? 70 : 100;
    estadoProgreso.puntaje += puntosGanados;
    guardarRecord(estadoProgreso.puntaje);

    estadoProgreso.historial.push({
      enunciado: ejercicio.enunciado || `Ejercicio ${estadoProgreso.ejercicioActual}`,
      correcto: true,
      intentos: estadoProgreso.intentosUsados,
    });

    renderizarInterfaz();
    mostrarFeedback(
      "exito",
      "✅",
      `${resultado.mensaje || "¡Correcto!"} Ganaste +${puntosGanados} puntos.`
    );
    return;
  }

  const quedanIntentos = estadoProgreso.intentosUsados < estadoProgreso.intentosMaximos;

  if (quedanIntentos) {
    renderizarInterfaz();
    mostrarFeedback(
      "error",
      "❌",
      `${resultado.mensaje || "No es correcta."} Te queda 1 intento en este ejercicio.`
    );
  } else {
    estadoProgreso.resueltoEnEjercicio = true;
    estadoProgreso.historial.push({
      enunciado: ejercicio.enunciado || `Ejercicio ${estadoProgreso.ejercicioActual}`,
      correcto: false,
      intentos: estadoProgreso.intentosUsados,
    });

    renderizarInterfaz();
    mostrarFeedback(
      "error",
      "❌",
      "Agotaste tus 2 intentos para este ejercicio.",
      solucionLatex,
      explicacionCorta
    );
  }
}

export function avanzarEjercicio() {
  if (estadoProgreso.ejercicioActual < estadoProgreso.totalEjercicios) {
    estadoProgreso.ejercicioActual += 1;
    prepararNuevoEjercicio();
    return false; 
  }
  return true;
}

export function mostrarResultados(contenedorDestinoId = "pantalla-resultados") {
  const destino = document.getElementById(contenedorDestinoId);
  if (!destino) return;

  guardarRecord(estadoProgreso.puntaje);

  const itemsHtml = estadoProgreso.historial
    .map(
      (item, idx) => `
      <li class="resultado-item ${item.correcto ? "item-ok" : "item-fail"}">
        <span>${item.correcto ? "✅" : "❌"} Ejercicio ${idx + 1}</span>
        <span>${item.correcto ? `Acertado (${item.intentos} int.)` : "Sin acierto"}</span>
      </li>
    `
    )
    .join("");

  destino.innerHTML = `
    <div class="resultados-card">
      <h2>Resultados de la práctica</h2>
      <p class="resultados-resumen">
        Aciertos: <strong>${estadoProgreso.aciertos} / ${estadoProgreso.totalEjercicios}</strong> ·
        Puntaje final: <strong>${estadoProgreso.puntaje}</strong> ·
        Récord: <strong>${estadoProgreso.record}</strong>
      </p>
      <ul class="resultados-lista">
        ${itemsHtml || "<li>No hay ejercicios registrados aún.</li>"}
      </ul>
      <button type="button" id="btn-reiniciar-practica" class="btn-reiniciar">
        Volver a empezar
      </button>
    </div>
  `;

  const btnReiniciar = document.getElementById("btn-reiniciar-practica");
  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      iniciar({ totalEjercicios: estadoProgreso.totalEjercicios });
    });
  }
}

export function obtenerEstado() {
  return { ...estadoProgreso };
}
