const containerVideos = document.querySelector('.videos__container');
const barraDePequisa = document.querySelector('.pesquisar__input');
const btnCategoria = document.querySelectorAll('.superior__item')

barraDePequisa.addEventListener('input',filtrarPesquisa);

async function buscarEMostrarVideos() {
    try{
    const busca = await fetch('http://localhost:3000/videos')

    const videos = await busca.json()
    videos.forEach((video) => {
          containerVideos.innerHTML += `
      <li class='videos__item'>
        <iframe src='${video.url}' title='${video.titulo}' frameborder="0" allowfullscreen></iframe>
        <div class='descricao-video'>
          <img class='img-canal' src='${video.imagem}' alt='Logo do canal'>
          <h3 class='titulo-video'>${video.titulo}</h3>
          <p class='titulo-canal'>${video.descricao}</p>
          <p class='categoria' hidden>${video.categoria}</p>
        </div>
      </li>
      `;
    });
  }catch(e){
    containerVideos.innerHTML = `
    <p>Houve um erro ao carregar os videos ${e}</p>`;
  }
}
buscarEMostrarVideos()



function filtrarPesquisa(){
  const videos = document.querySelectorAll('.videos__item');
  if(barraDePequisa.value != ''){
    videos.forEach((video)=>{
      const videosFiltrandos = video.querySelector('.titulo-video').textContent.toLocaleLowerCase().includes(barraDePequisa.value.toLocaleLowerCase())

      videosFiltrandos ? video.style.display = 'block':video.style.display = 'none'
    })
  }else{
    video.style.display = 'block';
  }

  // if(barraDePequisa.value != ''){
  //   for(let video of videos){
  //     let titulo = video.querySelector('.titulo-video').textContent.toLocaleLowerCase();
  //     let valorFiltro = barraDePequisa.value.toLocaleLowerCase();

  //     if(!titulo.includes(valorFiltro)){
  //       video.style.display = 'none';
  //     }else{
  //       video.style.display = 'block';
  //     }
  //   }
  // }else{
  //   video.style.display = 'block';
  // }
}

btnCategoria.forEach((btn)=>{
  let nomeCategoria = btn.getAttribute('name');
  btn.addEventListener('click', ()=>{
    filtrarPorCategoria(nomeCategoria)
  })
})

function filtrarPorCategoria(filtro){
  const videos = document.querySelectorAll('.videos__item')
  videos.forEach(video =>{
    let categoria = video.querySelector('.categoria').textContent.toLocaleLowerCase();
    console.log(categoria)
    if(!categoria.includes(filtro.toLocaleLowerCase()) && filtro.toLocaleLowerCase() != 'tudo'){
      video.style.display = 'none';
      }else{
          video.style.display = 'block';
      }

  })
}
