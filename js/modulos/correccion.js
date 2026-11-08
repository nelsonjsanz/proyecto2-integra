function evaluar(textoLaTeXRespuestas, bancoRespuestas) {
    const ce = new ComputeEngine.ComputeEngine();
    
    const regex = /\\placeholder\[([a-zA-Z0-9_]+)\]\{([^}]*)\}/g;
    let match;
    let todoCorrecto = true;

    while ((match = regex.exec(textoLaTeXRespuestas)) !== null) {
        const idPlaceholder = match[1];
        const valorUsuario = match[2].trim();
        

        if (bancoRespuestas.resultados[idPlaceholder]) {
            const valorEsperado = bancoRespuestas.resultados[idPlaceholder].valorCorrecto;

            try {
                
                const exprUsuario = ce.parse(valorUsuario);
                const exprCorrecta = ce.parse(valorEsperado);

                if (exprUsuario.isEqual(exprCorrecta)) {
                    bancoRespuestas.resultados[idPlaceholder].estado = true;
                } else {
                    
                    const diferencia = ce.box(['Subtract', exprUsuario, exprCorrecta]).evaluate();
                    
                    if (diferencia.isZero || diferencia.valueOf() === 0) {
                        bancoRespuestas.resultados[idPlaceholder].estado = true;
                    } else {
                        bancoRespuestas.resultados[idPlaceholder].estado = false;
                        todoCorrecto = false;
                    }
                }
                bancoRespuestas.respuestas.push(`${idPlaceholder}:${valorUsuario}`)
            } catch (error) {
                console.error(`Error al parsear ${idPlaceholder}:`, error);
                bancoRespuestas.resultados[idPlaceholder].estado = false;
                todoCorrecto = false;
            }
        }
    }

    return {
        aprobado: todoCorrecto,
        bancoActualizado: bancoRespuestas
    };
}

export {evaluar};