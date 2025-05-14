import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  TextField, 
  Paper,
  Box 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductosById } from '../../actions/ProductoActions';

const useStyles = makeStyles((theme) => ({
  containermt: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
  },
  text_title: {
    fontWeight: 900,
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  img_container: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: theme.shadows[4],
  },
  img_producto: {
    width: '100%',
    height: '400px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  details_container: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    boxShadow: theme.shadows[3],
  },
  text_bold: {
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  price_text: {
    fontSize: '2rem',
    color: theme.palette.success.main,
    fontWeight: 900,
    margin: theme.spacing(2, 0),
  },
  quantity_container: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(3, 0),
  },
  button: {
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    borderRadius: '8px',
    marginTop: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
}));

const DetalleProducto = ({ agregarAlCarrito }) => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    getProductosById(id)
      .then((data) => setProducto(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!producto) {
    return (
      <Container className={classes.containermt}>
        <Typography variant="h4" className={classes.text_title}>
          Cargando producto...
        </Typography>
      </Container>
    );
  }

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setCantidad(Math.min(Math.max(value, 1), producto.stock));
  };

  const handleAgregarProducto = () => {
    // Aquí incluimos explícitamente el id como llave
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      stock: producto.stock,
      cantidad
    });
    navigate('/carritoCompras');
  };

  return (
    <Container maxWidth="lg" className={classes.containermt}>
      <Typography variant="h3" className={classes.text_title}>
        {producto.nombre}
      </Typography>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} xs={12}>
          <Paper elevation={3} className={classes.img_container}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={classes.img_producto}
            />
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box className={classes.details_container}>
            <Typography variant="h4" className={classes.price_text}>
              ${producto.precio}
            </Typography>
            <Typography variant="body1" paragraph>
              <span className={classes.text_bold}>Descripción:</span> 
              {producto.descripcion}
            </Typography>
            {/* ... resto de detalles ... */}
            <Box className={classes.quantity_container}>
              <Typography variant="h6" className={classes.text_bold}>
                Cantidad:
              </Typography>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={cantidad}
                onChange={handleCantidadChange}
                inputProps={{ 
                  min: 1,
                  max: producto.stock,
                  style: { 
                    width: '80px',
                    textAlign: 'center'
                  }
                }}
              />
            </Box>
            <Button
              onClick={handleAgregarProducto}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              🛒 Agregar al Carrito
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetalleProducto;