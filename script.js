const elementById = (id) => {
    // document.getElementById(id);
     // return document.getElementById(id);
    // or 
    const inputValue = document.getElementById(id);
    return inputValue;
}

const handleSearch = () => {
    // console.log('miskfjkdf');
    const keyword = elementById('keyword');
    // error handle use
    const artistsContainer = elementById('artists');
    const albumsContainer = elementById('albums');
    // console.log(keyword.value);
    const url = ` https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showArtist(data.artists))
    // error handle clear data 
    keyword.value= '';
    artistsContainer.innerHTML="";
    albumsContainer.innerHTML="";

}

// object ke array anar jonno way 
// way-1
// data.artists.forEach(artist => {

// })
// way-2 
//  .then(data => showArtist(data.artists))2
//way-3
// const showArtist = (data) => {
//     const artists = data.artists;
//     artists.forEach(artist =>{

//     }

//way-4
// const showArtist = (data) => {
//     const {artists} = data;
//     artists.forEach(artist =>{

//     }
// const showArtist = ({artists}) => {
//     artists.forEach(artist =>{

//     }

const showArtist = (data) => {
    // console.log(data);
    const artistsContainer = elementById('artists');
    data.forEach(artist => {
        // console.log(artist);

        const div = document.createElement('div')
        div.classList.add('artist-card')
        div.innerHTML=`
        <div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb? artist.strArtistThumb:'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist? artist.strArtist: 'Not Available'}</h1>
    <p>Country: ${artist.strCountry? artist.strCountry:'Not Available' }</p>
    <p>Style: ${artist.strGenre? artist.strGenre:'Not Available'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>
        `
        artistsContainer.appendChild(div);
    });
};

//---------album details-----------

const fetchAlbums = (id) => {
    // console.log(id);
    // ctrl + enter 
    const albumsContainer = elementById('albums');
    const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showAlbum(data.album))

    albumsContainer.innerHTML="";

}

const showAlbum = (data) => {
    // console.log(data);
    const albumsContainer = elementById('albums');
    data.forEach(album => {
        const div = document.createElement('div');
        div.classList.add('albums');
        div.innerHTML= `
        <div class="album-image-container">
          <img
            src="${album.strAlbumThumb? album.strAlbumThumb:'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
        `
        albumsContainer.appendChild(div);
    })
}