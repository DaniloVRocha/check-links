import chalk from "chalk";
import fs from 'fs'




function trataErro(erro){
    throw new Error(chalk.red(erro.code, "Não foi possivel encontrar o arquivo"))
}

async function pegaArquivo(caminhoArquivo){
    try{
        const texto = await fs.promises.readFile(caminhoArquivo, 'utf-8')
        return extraiLinks(texto);
    }catch(erro){
        trataErro(erro)
    }
}

function extraiLinks(texto){
    const regex =/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura =>({
        [captura[1]]: captura[2]
    }))
    return resultados.length !== 0 ? resultados : chalk.red("Não Há Links no Arquivo.")
}

export default pegaArquivo;