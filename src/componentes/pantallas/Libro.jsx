import React, { useEffect, useState } from 'react';
import { 
  Container,
  Card, 
  Grid, 
  TextField, 
  Button,
  MenuItem, 
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { agregarLibro, listarLibros, actualizarLibro, eliminarLibro } from '../data/Libros';

const useStyles = makeStyles((theme) => ({
  containermt: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  },
  card: {
    padding: theme.spacing(3),
    borderRadius: '8px'
  },
  gridmb: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%'
  }
}));

const ClearLibro = {
  categoria: '',
  titulo: '',
  autor: '',
  key: null
};

const Libro = () => {
    const classes = useStyles();
    const [libro, setLibro] = useState(ClearLibro);
    const [open, setOpen] = useState(false);
    const [libroEdita, setLibroEdita] = useState(ClearLibro);
    const [librosArray, setLibrosArray] = useState([]);

    useEffect(() => {
        setLibrosArray(listarLibros());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarData();
    };

    const guardarData = () => {
        const nuevoArrayLibros = agregarLibro(libro);
        setLibrosArray(nuevoArrayLibros);
        setLibro({ ...ClearLibro });
    };
    
    const abrirDialog = (libro) => {
        setLibroEdita(libro);
        setOpen(true);
    };

    const eliminarData = (key) => {
        const nuevosLibros = eliminarLibro(key);
        setLibrosArray(nuevosLibros);
    };

    const handleChangeEdita = (e) => {
        const { name, value } = e.target;
        setLibroEdita(prev => ({ ...prev, [name]: value }));
    }

    const cerrarDialog = () => { 
        setOpen(false);
        setLibroEdita(ClearLibro);
    }

    const editarData = (e) => {
        e.preventDefault();
        const actualizados = actualizarLibro(libroEdita);
        setLibrosArray(actualizados);
        cerrarDialog();
    }

    return (
        <Container className={classes.containermt}>
            <Grid container justifyContent="center">
                <Grid item lg={7} md={8}>
                    <Card className={classes.card} align="center">
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField 
                                        select
                                        label="Categoría" 
                                        variant="outlined"
                                        fullWidth
                                        name="categoria"
                                        value={libro.categoria}
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="Programacion">Programación</MenuItem>
                                        <MenuItem value="Historia">Historia</MenuItem>
                                        <MenuItem value="Matematicas">Matemáticas</MenuItem>
                                    </TextField>
                                </Grid>
                                
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField 
                                        label="Título" 
                                        variant="outlined"
                                        fullWidth
                                        name="titulo"
                                        value={libro.titulo}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField 
                                        label="Autor" 
                                        variant="outlined"
                                        fullWidth
                                        name="autor"
                                        value={libro.autor}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                
                                <Grid item md={12} xs={12}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            
            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {librosArray.map(libroObj => (
                            <TableRow key={libroObj.key}>
                                <TableCell>{libroObj.categoria}</TableCell>
                                <TableCell>{libroObj.titulo}</TableCell>
                                <TableCell>{libroObj.autor}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => abrirDialog(libroObj)}
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => eliminarData(libroObj.key)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={cerrarDialog} maxWidth="xs" fullWidth>
                <DialogTitle align="center">Editar Libro</DialogTitle>
                <DialogContent>
                    <form onSubmit={editarData}>
                        <TextField 
                            select
                            label="Categoría"
                            name="categoria"
                            value={libroEdita.categoria}
                            onChange={handleChangeEdita}
                            fullWidth
                            sx={{ my: 2 }}
                            required
                        >
                            <MenuItem value="Programacion">Programación</MenuItem>
                            <MenuItem value="Historia">Historia</MenuItem>
                            <MenuItem value="Matematicas">Matemáticas</MenuItem>
                        </TextField>
                        
                        <TextField 
                            label="Título" 
                            name="titulo"
                            value={libroEdita.titulo}
                            onChange={handleChangeEdita}
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            required
                        />
                        
                        <TextField
                            label="Autor"
                            name="autor"
                            value={libroEdita.autor}
                            onChange={handleChangeEdita}
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            required
                        />
                        
                        <Button 
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Guardar cambios
                        </Button>  
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Libro;