let Banco = [
    {
        pasos: 6,
        casos: [
            "\\int_0^{3}\\!\\left(x^2+2\\right)\\,\\mathrm{d}x",
            "=\\int_0^{3}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_0^{3}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\frac{x^{\\placeholder[answer2]{?}}}{\\placeholder[answer3]{?}}\\right\\rbrack_\\placeholder[answer4]{?}^{\\placeholder[answer5]{?}} + \\left\\lbrack\\frac{2x^{\\placeholder[answer6]{?}}}{\\placeholder[answer7]{?}}\\right\\rbrack_\\placeholder[answer8]{?}^{\\placeholder[answer9]{?}}",
            "=\\left\\lbrack\\frac{x^{\\placeholder[answer10]{?}}}{{\\placeholder[answer11]{?}}}+\\frac{2x^{\\placeholder[answer12]{?}}}{{\\placeholder[answer13]{?}}}\\right\\rbrack_0^{3}",
            "=\\left(\\frac{\\placeholder[answer14]{?}}^{\\placeholder[answer15]{?}}}+ 2\\placeholder[answer16]{?}\\right)-\\left(\\frac{\\placeholder[answer17]{?}}^{\\placeholder[answer18]{?}}} + {\\placeholder[answer19]{?}}\\right)",
            "\\int_0^{3}\\!\\left(x^2+2\\right)\\,\\mathrm{d}x = {\\placeholder[answer20]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "x^2", estado: false },
            answer1: { valorCorrecto: "2", estado: false },
            answer2: { valorCorrecto: "2+1", estado: false },
            answer3: { valorCorrecto: "2+1", estado: false },
            answer4: { valorCorrecto: "0", estado: false },
            answer5: { valorCorrecto: "3", estado: false },
            answer6: { valorCorrecto: "0+1", estado: false },
            answer7: { valorCorrecto: "0+1", estado: false },
            answer8: { valorCorrecto: "0", estado: false },
            answer9: { valorCorrecto: "3", estado: false },
            answer10: { valorCorrecto: "3", estado: false },
            answer11: { valorCorrecto: "3", estado: false },
            answer12: { valorCorrecto: "1", estado: false },
            answer13: { valorCorrecto: "1", estado: false },
            answer14: { valorCorrecto: "3^3", estado: false },
            answer15: { valorCorrecto: "3", estado: false },
            answer16: { valorCorrecto: "3", estado: false },
            answer17: { valorCorrecto: "0", estado: false },
            answer18: { valorCorrecto: "3", estado: false },
            answer19: { valorCorrecto: "0", estado: false },
            answer20: { valorCorrecto: "15", estado: false }
        },
        respuestas:[],
        nivel: 1,
        guia:[
            { text:"Resolver la integral:", boton: false, formula: "" },
            { text:"Separamos la integral", boton: true, formula: "" },
            { text:"Aplica la integral sabiendo que ", boton: true, formula: "<math-field readonly>x^{n}=\\frac{x^{n+1}}{n+1}</math-field>" },
            { text:"Unimos ambos resultados", boton: true, formula: "" },
            { text:"Evaluamos en los intervalos dados", boton: true, formula: "" },
            { text:"Resultado", boton: true, formula: "" }
        ]
    },
    {
        pasos: 6,
        casos: [
            "\\int_1^{4}\\!\\left(x^2+1\\right)\\,\\mathrm{d}x",
            "=\\int_1^{4}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_1^{4}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\frac{x^{\\placeholder[answer2]{?}}}{\\placeholder[answer3]{?}}\\right\\rbrack_\\placeholder[answer4]{?}^{\\placeholder[answer5]{?}} + \\left\\lbrack\\frac{1x^{\\placeholder[answer6]{?}}}{\\placeholder[answer7]{?}}\\right\\rbrack_\\placeholder[answer8]{?}^{\\placeholder[answer9]{?}}",
            "=\\left\\lbrack\\frac{x^{\\placeholder[answer10]{?}}}{{\\placeholder[answer11]{?}}}+\\frac{1x^{\\placeholder[answer12]{?}}}{{\\placeholder[answer13]{?}}}\\right\\rbrack_1^{4}",
            "=\\left(\\frac{\\placeholder[answer14]{?}}^{\\placeholder[answer15]{?}}}+ 1\\cdot\\placeholder[answer16]{?}\\right)-\\left(\\frac{\\placeholder[answer17]{?}}^{\\placeholder[answer18]{?}}} + 1\\cdot{\\placeholder[answer19]{?}}\\right)",
            "\\int_1^{4}\\!\\left(x^2+1\\right)\\,\\mathrm{d}x = {\\placeholder[answer20]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "x^2", estado: false },
            answer1: { valorCorrecto: "1", estado: false },
            answer2: { valorCorrecto: "2+1", estado: false },
            answer3: { valorCorrecto: "2+1", estado: false },
            answer4: { valorCorrecto: "1", estado: false },
            answer5: { valorCorrecto: "4", estado: false },
            answer6: { valorCorrecto: "0+1", estado: false },
            answer7: { valorCorrecto: "0+1", estado: false },
            answer8: { valorCorrecto: "1", estado: false },
            answer9: { valorCorrecto: "4", estado: false },
            answer10: { valorCorrecto: "3", estado: false },
            answer11: { valorCorrecto: "3", estado: false },
            answer12: { valorCorrecto: "1", estado: false },
            answer13: { valorCorrecto: "1", estado: false },
            answer14: { valorCorrecto: "4^3", estado: false },
            answer15: { valorCorrecto: "3", estado: false },
            answer16: { valorCorrecto: "4", estado: false },
            answer17: { valorCorrecto: "1^3", estado: false },
            answer18: { valorCorrecto: "3", estado: false },
            answer19: { valorCorrecto: "1", estado: false },
            answer20: { valorCorrecto: "24", estado: false }
        },
        respuestas:[],
        nivel: 1,
        guia:[
            { text:"Resolver la integral:", boton: false, formula: "" },
            { text:"Separamos la integral", boton: true, formula: "" },
            { text:"Aplica la integral sabiendo que ", boton: true, formula: "<math-field readonly>x^{n}=\\frac{x^{n+1}}{n+1}</math-field>" },
            { text:"Unimos ambos resultados", boton: true, formula: "" },
            { text:"Evaluamos en los intervalos dados", boton: true, formula: "" },
            { text:"Resultado", boton: true, formula: "" }
        ]
    },
    {
        pasos: 6,
        casos: [
            "\\int_0^{\\pi/2}\\!\\left(\\cos(x)+1\\right)\\,\\mathrm{d}x",
            "=\\int_0^{\\pi/2}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_0^{\\pi/2}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\placeholder[answer2]{?}\\right\\rbrack_\\placeholder[answer3]{?}^{\\placeholder[answer4]{?}} + \\left\\lbrack\\frac{1x^{\\placeholder[answer5]{?}}}{{\\placeholder[answer6]{?}}}\\right\\rbrack_\\placeholder[answer7]{?}^{\\placeholder[answer8]{?}}",
            "=\\left\\lbrack\\sin(x) + x\\right\\rbrack_0^{\\pi/2}",
            "=\\left(\\sin\\left(\\frac{\\pi}{\\placeholder[answer9]{?}}\\right) + \\frac{\\pi}{\\placeholder[answer10]{?}}\\right)-\\left(\\sin(\\placeholder[answer11]{?}) + {\\placeholder[answer12]{?}}\\right)",
            "\\int_0^{\\pi/2}\\!\\left(\\cos(x)+1\\right)\\,\\mathrm{d}x = {\\placeholder[answer13]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "\\cos(x)", estado: false },
            answer1: { valorCorrecto: "1", estado: false },
            answer2: { valorCorrecto: "\\sin(x)", estado: false },
            answer3: { valorCorrecto: "0", estado: false },
            answer4: { valorCorrecto: "\\pi/2", estado: false },
            answer5: { valorCorrecto: "0+1", estado: false },
            answer6: { valorCorrecto: "0+1", estado: false },
            answer7: { valorCorrecto: "0", estado: false },
            answer8: { valorCorrecto: "\\pi/2", estado: false },
            answer9: { valorCorrecto: "2", estado: false },
            answer10: { valorCorrecto: "2", estado: false },
            answer11: { valorCorrecto: "0", estado: false },
            answer12: { valorCorrecto: "0", estado: false },
            answer13: { valorCorrecto: "1 + \\frac{\\pi}{2}", estado: false }
        },
        respuestas:[],
        nivel: 2,
        guia:[
            { text:"Resolver la integral trigonométrica:", boton: false, formula: "" },
            { text:"Separamos la integral en suma de términos", boton: true, formula: "" },
            { text:"Integramos sabiendo que la integral de coseno es seno", boton: true, formula: "<math-field readonly>\\int \\cos(x)\\,\\mathrm{d}x = \\sin(x)</math-field>" },
            { text:"Unimos ambos resultados en corchetes", boton: true, formula: "" },
            { text:"Evaluamos en los límites superior e inferior", boton: true, formula: "" },
            { text:"Resultado final exacto", boton: true, formula: "" }
        ]
    },
    {
        pasos: 6,
        casos: [
            "\\int_0^{\\pi}\\!\\left(\\sin(x)+2\\right)\\,\\mathrm{d}x",
            "=\\int_0^{\\pi}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_0^{\\pi}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\placeholder[answer2]{?}\\right\\rbrack_\\placeholder[answer3]{?}^{\\placeholder[answer4]{?}} + \\left\\lbrack\\frac{2x^{\\placeholder[answer5]{?}}}{{\\placeholder[answer6]{?}}}\\right\\rbrack_\\placeholder[answer7]{?}^{\\placeholder[answer8]{?}}",
            "=\\left\\lbrack-\\cos(x) + 2x\\right\\rbrack_0^{\\pi}",
            "=\\left(-\\cos(\\placeholder[answer9]{?}) + 2\\cdot\\pi\\right)-\\left(-\\cos(\\placeholder[answer10]{?}) + 2\\cdot{\\placeholder[answer11]{?}}\\right)",
            "\\int_0^{\\pi}\\!\\left(\\sin(x)+2\\right)\\,\\mathrm{d}x = {\\placeholder[answer12]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "\\sin(x)", estado: false },
            answer1: { valorCorrecto: "2", estado: false },
            answer2: { valorCorrecto: "-\\cos(x)", estado: false },
            answer3: { valorCorrecto: "0", estado: false },
            answer4: { valorCorrecto: "\\pi", estado: false },
            answer5: { valorCorrecto: "0+1", estado: false },
            answer6: { valorCorrecto: "0+1", estado: false },
            answer7: { valorCorrecto: "0", estado: false },
            answer8: { valorCorrecto: "\\pi", estado: false },
            answer9: { valorCorrecto: "\\pi", estado: false },
            answer10: { valorCorrecto: "0", estado: false },
            answer11: { valorCorrecto: "0", estado: false },
            answer12: { valorCorrecto: "2 + 2\\pi", estado: false }
        },
        respuestas:[],
        nivel: 2,
        guia:[
            { text:"Resolver la integral trigonométrica:", boton: false, formula: "" },
            { text:"Separamos la integral", boton: true, formula: "" },
            { text:"Integramos sabiendo que la integral de seno es menos coseno", boton: true, formula: "<math-field readonly>\\int \\sin(x)\\,\\mathrm{d}x = -\\cos(x)</math-field>" },
            { text:"Agrupamos resultados", boton: true, formula: "" },
            { text:"Evaluamos en los intervalos dados", boton: true, formula: "" },
            { text:"Resultado", boton: true, formula: "" }
        ]
    },
    {
        pasos: 6,
        casos: [
            "\\int_0^{1}\\!\\left(e^x+3\\right)\\,\\mathrm{d}x",
            "=\\int_0^{1}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_0^{1}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\placeholder[answer2]{?}\\right\\rbrack_\\placeholder[answer3]{?}^{\\placeholder[answer4]{?}} + \\left\\lbrack\\frac{3x^{\\placeholder[answer5]{?}}}{{\\placeholder[answer6]{?}}}\\right\\rbrack_\\placeholder[answer7]{?}^{\\placeholder[answer8]{?}}",
            "=\\left\\lbrack e^x + 3x \\right\\rbrack_0^{1}",
            "=\\left(e^{\\placeholder[answer9]{?}} + 3\\cdot\\placeholder[answer10]{?}\\right)-\\left(e^{\\placeholder[answer11]{?}} + 3\\cdot{\\placeholder[answer12]{?}}\\right)",
            "\\int_0^{1}\\!\\left(e^x+3\\right)\\,\\mathrm{d}x = {\\placeholder[answer13]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "e^x", estado: false },
            answer1: { valorCorrecto: "3", estado: false },
            answer2: { valorCorrecto: "e^x", estado: false },
            answer3: { valorCorrecto: "0", estado: false },
            answer4: { valorCorrecto: "1", estado: false },
            answer5: { valorCorrecto: "0+1", estado: false },
            answer6: { valorCorrecto: "0+1", estado: false },
            answer7: { valorCorrecto: "0", estado: false },
            answer8: { valorCorrecto: "1", estado: false },
            answer9: { valorCorrecto: "1", estado: false },
            answer10: { valorCorrecto: "1", estado: false },
            answer11: { valorCorrecto: "0", estado: false },
            answer12: { valorCorrecto: "0", estado: false },
            answer13: { valorCorrecto: "e + 2", estado: false }
        },
        respuestas:[],
        nivel: 3,
        guia:[
            { text:"Resolver la integral exponencial:", boton: false, formula: "" },
            { text:"Separamos la integral en suma", boton: true, formula: "" },
            { text:"Aplica la integral sabiendo que la exponencial permanece igual", boton: true, formula: "<math-field readonly>\\int e^{x}\\,\\mathrm{d}x = e^x</math-field>" },
            { text:"Combinamos ambos resultados", boton: true, formula: "" },
            { text:"Evaluamos en los intervalos dados", boton: true, formula: "" },
            { text:"Resultado", boton: true, formula: "" }
        ]
    },
    {
        pasos: 6,
        casos: [
            "\\int_0^{2}\\!\\left(e^x+x\\right)\\,\\mathrm{d}x",
            "=\\int_0^{2}\\!\\left(\\placeholder[answer0]{?}\\right)\\,\\mathrm{d}x + \\int_0^{2}\\!\\left(\\placeholder[answer1]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\placeholder[answer2]{?}\\right\\rbrack_\\placeholder[answer3]{?}^{\\placeholder[answer4]{?}} + \\left\\lbrack\\frac{x^{\\placeholder[answer5]{?}}}{{\\placeholder[answer6]{?}}}\\right\\rbrack_\\placeholder[answer7]{?}^{\\placeholder[answer8]{?}}",
            "=\\left\\lbrack e^x + \\frac{x^2}{2} \\right\\rbrack_0^{2}",
            "=\\left(e^{\\placeholder[answer9]{?}} + \\frac{\\placeholder[answer10]{?}^2}{\\placeholder[answer11]{?}}\\right)-\\left(e^{\\placeholder[answer12]{?}} + \\frac{\\placeholder[answer13]{?}^2}{\\placeholder[answer14]{?}}\\right)",
            "\\int_0^{2}\\!\\left(e^x+x\\right)\\,\\mathrm{d}x = {\\placeholder[answer15]{?}}"
        ],
        resultados:{
            answer0: { valorCorrecto: "e^x", estado: false },
            answer1: { valorCorrecto: "x", estado: false },
            answer2: { valorCorrecto: "e^x", estado: false },
            answer3: { valorCorrecto: "0", estado: false },
            answer4: { valorCorrecto: "2", estado: false },
            answer5: { valorCorrecto: "1+1", estado: false },
            answer6: { valorCorrecto: "1+1", estado: false },
            answer7: { valorCorrecto: "0", estado: false },
            answer8: { valorCorrecto: "2", estado: false },
            answer9: { valorCorrecto: "2", estado: false },
            answer10: { valorCorrecto: "2", estado: false },
            answer11: { valorCorrecto: "2", estado: false },
            answer12: { valorCorrecto: "0", estado: false },
            answer13: { valorCorrecto: "0", estado: false },
            answer14: { valorCorrecto: "2", estado: false },
            answer15: { valorCorrecto: "e^2 + 1", estado: false }
        },
        respuestas:[],
        nivel: 3,
        guia:[
            { text:"Resolver la integral:", boton: false, formula: "" },
            { text:"Separamos la integral", boton: true, formula: "" },
            { text:"Aplicamos reglas de integración para exponencial y potencia", boton: true, formula: "<math-field readonly>\\int e^x\\,\\mathrm{d}x = e^x</math-field>" },
            { text:"Unimos ambos resultados", boton: true, formula: "" },
            { text:"Evaluamos los límites de integración", boton: true, formula: "" },
            { text:"Resultado final", boton: true, formula: "" }
        ]
    }
];

export { Banco };