import Libro from "../pantallas/Libro";

const LibrosArray = [];
let key = 0;

const agregarLibro = (libro) => {
    let libroJson = libro;
    key++;
    libroJson.key = key;
    LibrosArray.push(libroJson);
    console.log("LibrosArray:", LibrosArray);
}

export {agregarLibro };