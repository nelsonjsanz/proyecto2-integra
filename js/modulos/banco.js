let Banco = [
    {
        pasos: 5,
        casos: [
            "\\int_0^{\\infty}\\!\\left(x^2+5\\right)\\,\\mathrm{d}x",
            "=\\int_0^{\\infty}\\!\\left(\\placeholder[answer]{?}\\right)\\,\\mathrm{d}x + \\int_0^{\\infty}\\!\\left(\\placeholder[answer]{?}\\right)\\,\\mathrm{d}x",
            "=\\left\\lbrack\\frac{x^{\\placeholder[answer]{?}}}{\\placeholder[answer]{?}}\\right\\rbrack_\\placeholder[answer]{?}^{\\placeholder[answer]{?}} + \\left\\lbrack\\frac{5x^{\\placeholder[answer]{?}}}{\\placeholder[answer]{?}}\\right\\rbrack_\\placeholder[answer]{?}^{\\placeholder[answer]{?}}",
            "=\\left\\lbrack\\frac{x^2}{2}+\\frac{5x^0}{0}\\right\\rbrack_0^{\\infty}",
            "=\\left(\\frac{\\infty^2}{2}+\\frac{5\\infty^0}{0}\\right)-\\left(\\frac{0^2}{2}+\\frac{50^0}{0}\\right)"
        ],
        resultados:[],
        guia:[
            {
                text:"Separamos la integral",
                formula: ""
            },
            {
                text:"Aplica la integral sabiendo que ", 
                formula: "<math-field readonly>x^{n}=\\frac{x^{n+1}}{n+1}</math-field>"
            },
            {
                text:"Unios ambos resultados", 
                formula: ""
            },
            {
                text:"Evaluamos en los intervalos dados", 
                formula: ""
            }
        ]
    }
]

export { Banco }

