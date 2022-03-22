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

let postagens;  
if (localStorage.getItem("postagens") == null) {
    postagens = [new Post(0, "Título", "Descrição", "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg3.wikia.nocookie.net%2F__cb20131128234008%2Ftotal-movies%2Fimages%2F5%2F59%2FSheriff_Woody.1.jpg&f=1&nofb=1")]
    localStorage.setItem("postagens", JSON.stringify(postagens))
} else {
    postagens = JSON.parse(localStorage.getItem("postagens"))
}

function renderizaSection(postagens) {

    let htmlDaSection = "";

    for (let post of postagens) {
        let novoPost = 
        `
        <article>
            <img src=${post.urlImagem} alt="">
            <h2>${post.titulo}</h2>
            <p>${post.descricao}</p>
            <button onclick="handleDelete(event)" id=${post.id} class="deletar">Deletar</button>
        </article>

        `
        htmlDaSection += novoPost;
    }

    document.querySelector("#sectionPostagens").innerHTML = htmlDaSection;
}

renderizaSection(postagens);

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

let buttonDeletarReferencia = document.getElementsByClassName('deletar')

console.log(buttonDeletarReferencia)

handleDelete = (event) => {
    
    let idDoPost = parseInt(event.path[0].id);
    for (let i = 0; i < postagens.length; i++) {
        if (postagens[i].id === idDoPost) {
            postagens.splice(i, 1);
            break;
        }        
    }

    localStorage.setItem("postagens", JSON.stringify(postagens))

    renderizaSection(postagens);

}