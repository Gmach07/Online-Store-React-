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
  Paper
} from '@mui/material';
import { makeStyles } from '@mui/styles';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        guardarData();
    };

    const guardarData = () => {
        console.log("Libro guardado:", libro);
        setLibro({ ...ClearLibro });
    };
    
    const abrirDialog = () => {
        console.log("boton editar funcionando");
    };

    const eliminarData = () => {
        console.log("boton eliminar funcionando");
    };

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
        </Container>
    );
};

export default Libro;