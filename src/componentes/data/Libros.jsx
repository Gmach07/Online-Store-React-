let libros = [];
let lastKey = 0;

const generarKey = () => ++lastKey;

const agregarLibro = (libro) => {
    const nuevoLibro = { 
        ...libro, 
        key: generarKey(),
        fechaCreacion: new Date().toISOString()
    };
    libros = [...libros, nuevoLibro];
    return libros; // Retornar el array completo
};

const listarLibros = () => [...libros];

const actualizarLibro = (libroActualizado) => {
    libros = libros.map(libro => 
        libro.key === libroActualizado.key ? libroActualizado : libro
    );
    return libros;
};

const eliminarLibro = (key) => {
    libros = libros.filter(libro => libro.key !== key);
    return libros;
};

export { agregarLibro, listarLibros, actualizarLibro, eliminarLibro };