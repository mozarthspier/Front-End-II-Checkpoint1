// Integrantes: Mozarth Spier, Henrique Arantes, Rafael Vilela

let inputTituloReferencia = document.querySelector("#inputTitulo");
let inputDescricaoReferencia = document.querySelector("#inputDescricao");
let inputImagemReferencia = document.querySelector("#inputImagem");
let inputEnvioReferencia = document.querySelector("#inputEnvio");

const Post = function (id, titulo, descricao, urlImagem) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.urlImagem = urlImagem;
    this.id = id;
}

// Inicializa o array de postagens com o conteúdo do localStorage, se esse já existe
// Ou inicializa vazio, se não existe
let postagens;  
if (localStorage.getItem("postagens") == null) {
    postagens = []
    localStorage.setItem("postagens", JSON.stringify(postagens))
} else {
    postagens = JSON.parse(localStorage.getItem("postagens"))
}

// Função para renderizar o conteúdo da session, onde as postagens são exibidas
function renderizaSection(postagens) {
    let htmlDaSection = "";

    for (let post of postagens) {
        let novoPost = 
        `
        <article>
            <img src=${post.urlImagem} alt="">
            <h2>${post.titulo}</h2>
            <p>${post.descricao}</p>
            <button onclick="handleDelete(event)" id=${post.id}>Deletar</button>
        </article>

        `
        htmlDaSection += novoPost;
    }

    document.querySelector("#sectionPostagens").innerHTML = htmlDaSection;
}

// Chama a função renderizaSection para quando a página é atualizada
renderizaSection(postagens);

// Lógica de criação de novos posts e gravação no local storage
inputEnvioReferencia.addEventListener("click", event => {
    event.preventDefault();

    let titulo = inputTituloReferencia.value;
    let descricao = inputDescricaoReferencia.value;
    let urlImagem = inputImagemReferencia.value;
    let id = (postagens.length !== 0) ? postagens[0].id + 1 : 0;
    let novoPost = new Post(id, titulo, descricao, urlImagem);

    postagens.unshift(novoPost);

    localStorage.setItem("postagens", JSON.stringify(postagens))
    renderizaSection(postagens);
})

// Função para deletar as postagens. Usa a ID do post para deletá-lo do local storage
handleDelete = (event) => {
    let idDoPost = parseInt(event.path[0].id);
    let index = postagens.findIndex((el) => el.id === idDoPost)

    postagens.splice(index, 1)

    localStorage.setItem("postagens", JSON.stringify(postagens))
    renderizaSection(postagens);
}