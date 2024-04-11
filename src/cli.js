import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";
import chalk from 'chalk';
import fs from 'fs';

const args = process.argv;

async function imprimeLista(resultado, nomeArquivo, valida){
    if(valida){
        console.log(chalk.yellow(`Lista Validada`),
        chalk.yellow(nomeArquivo),
        await listaValidada(resultado))
    }else{
        console.log(chalk.yellow(nomeArquivo), resultado)
    }  
}

async function processaTexto(args){
    const caminho = args[2];
    const valida = args[3] === '--valida';

    try{
        fs.lstatSync(caminho)
    }catch(erro){
        if(erro.code === "ENOENT"){
            console.log("Arquivo ou Diretório não existe.")
            return;
        }
    }
    
    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado, caminho, valida)
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const lista = await pegaArquivo(`${caminho}/${arquivo}`);
            imprimeLista(lista, `${caminho}/${arquivo}`, valida)
        })
    }
}

processaTexto(args)