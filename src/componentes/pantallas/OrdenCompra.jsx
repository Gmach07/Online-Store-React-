import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  contenedor: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
  titulo: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

const OrdenCompra = () => {
  const classes = useStyles();
  const { id } = useParams(); // ID de la compra
  const { state } = useLocation();

  // Datos que vienen de ProcesoCompra
  const {
    direccion = '',
    ciudad = '',
    pais = '',
    metodoPago = '',
    carrito = []
  } = state || {};

  return (
    <Container className={classes.contenedor}>
      <Typography variant="h4" className={classes.titulo}>
        Orden de Compra: {id}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Datos de Envío</Typography>
        <Typography variant="subtitle1">
          <strong>Dirección:</strong> {direccion}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Ciudad:</strong> {ciudad}
        </Typography>
        <Typography variant="subtitle1">
          <strong>País:</strong> {pais}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Método de Pago:</strong> {metodoPago}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h6">Productos Comprados:</Typography>
        {carrito.length === 0 ? (
          <Typography variant="body1">No hay productos.</Typography>
        ) : (
          carrito.map((producto) => (
            <Typography key={producto.key} variant="body1">
              {producto.nombre} - {producto.cantidad} x ${producto.precio.toFixed(2)} = ${(producto.cantidad * producto.precio).toFixed(2)}
            </Typography>
          ))
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">
          Total: $
          {carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}
        </Typography>
      </Box>
    </Container>
  );
};

export default OrdenCompra;

