import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objLink) => Object.values(objLink).join())
}

async function checaStatus(listaURLs){
    const arrayStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(erro){
                return manejaErros(erro)
            }
        })
    )

    return arrayStatus;
}

function manejaErros(erro){
    if(erro.cause.code === "ENOTFOUND"){     
        return "Link não encontrado"
    }else{
        "Ocorreu um erro"
    }
}

async function listaValidada(listaDeLinks){
    const links = extraiLinks(listaDeLinks)
    const status = await checaStatus(links);

    return listaDeLinks.map((obj, index) => ({
        ...obj,
        status:status[index]
    }))
}



export default listaValidada