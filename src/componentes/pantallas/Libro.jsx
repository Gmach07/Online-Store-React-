import React, { useState } from 'react';
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
import { agregarLibro } from '../data/Libros';

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
  autor: ''
};

const Libro = () => {
    const classes = useStyles();
    const [libro, setLibro] = useState(ClearLibro);
    const [open, setOpen] = useState(false);
    const [libroEdita, setLibroEdita] = useState({
        categoriaE: '',
        tituloE: '',
        autorE: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarData();
    };

    const guardarData = () => {
        agregarLibro(libro);
        console.log("Libro guardado:", libro);
        setLibro({...ClearLibro });
    };
    
    const abrirDialog = () => {
        setOpen(true);
        console.log("boton editar funcionando");
    };

    const eliminarData = () => {
        console.log("boton eliminar funcionando");
    };

    const handleChangeEdita = (e) => {
        const { name, value } = e.target;
        setLibroEdita((prev) => ({ ...prev, [name]: value }));
    }

    const cerrarDialog = () => { 
        setOpen(false);
    }

    const editarData = (e) => {
        e.preventDefault();
        console.log("Libro editado:", libroEdita);
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
                                    />
                                </Grid>
                                
                                <Grid item md={12} xs={12}>
                                    <Button

                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        //onClick = {guardarData}
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
                        <TableRow>
                            <TableCell>Programacion</TableCell>
                            <TableCell>Programacion con German</TableCell>
                            <TableCell>German el mero queso</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={abrirDialog}
                                    sx={{ mr: 1 }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={eliminarData}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Diálogo de edición */}
            <Dialog 
                open={open} 
                onClose={cerrarDialog} 
                maxWidth="xs" 
                fullWidth
            >
                <DialogTitle align="center">Editar Libro</DialogTitle>
                <DialogContent>
                    <form onSubmit={editarData}>
                        <TextField 
                            select
                            label="Categoría" 
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            name="categoriaE"
                            value={libroEdita.categoriaE}
                            onChange={handleChangeEdita}
                        >
                            <MenuItem value="Programacion">Programación</MenuItem>
                            <MenuItem value="Historia">Historia</MenuItem>
                            <MenuItem value="Matematicas">Matemáticas</MenuItem>
                        </TextField>
                        
                        <TextField 
                            label="Título" 
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            name="tituloE"
                            value={libroEdita.tituloE}
                            onChange={handleChangeEdita}
                        />
                        
                        <TextField
                            label="Autor"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            name="autorE"
                            value={libroEdita.autorE}
                            onChange={handleChangeEdita}
                        />
                        
                        <Button 
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            type="submit"
                        >
                            Guardar
                        </Button>  
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Libro;