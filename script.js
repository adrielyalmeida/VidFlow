const containerVideos = document.querySelector(".videos__container");  //vai capturar a UL que criamos lá no index, acima do script


async function buscarEMostrarVideos(){
    try {    // tenta executar o código abaixo e se capturar algum erro, fará o q está no catch abaixo//
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json();
        // colocando esses await acima, irá substituir os .then abaixo
        // .then(res => res.json())
        // .then((videos) =>
            videos.forEach((video) => {
               /* if(video.categoria == "") {
                    throw new Error('Vídeo não tem categoria');
                } */    //exemplo de algum erro específico //
                containerVideos.innerHTML += `
                <li class="videos__item"> 
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                </li>
                `;
            })       //hidden na linha 22, deixa a categoria escondida, é só para pegarmos a informação
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

//Outra opção para tratar erros abaixo

    // .catch ((error) => {
    //    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
    // })//TRATAMENTO DE ERROS: analisa o código antes dele, para ver se tem algum erro//

buscarEMostrarVideos();

//Fazer a barra de pesuisa funcionar

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != "") {
        for(let video of videos) {      //caminhar pelos vídeos
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = barraDePesquisa.value.toLowerCase();     // para comparar os dois textos em minúsculo
            
            if(!titulo.includes(valorFiltro)) {
                video.style.display = "none"; //se o vídeo não se inclui na pesquisa, ele some
            } else {
                video.style.display = "block"; //se o título vídeo se inclui na pesquisa, ele será mostrado
            }
        }
    } else {
        video.style.display = "block";  //se a barra de pesquisa estiver vazia, mostra todos os vídeos 

    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCate3goria(nomeCategoria));
})

function filtrarPorCate3goria(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos) {
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}