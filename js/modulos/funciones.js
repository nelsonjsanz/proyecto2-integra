import { Banco } from "./banco.js";

export function ejercicioAleatorio(nivel) {
    let n = Math.floor(Math.random() * (Banco.length - 1)) + 1;
    return Banco[n-1].nivel == nivel ? Banco[n-1] : ejercicioAleatorio(nivel);
}

export function configurarTecladoVirtual() {
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
