import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CarritoCompras = ({ carrito, actualizarCantidad, eliminarProducto }) => {
  const navigate = useNavigate();

  const handleCantidadChange = (e, key) => {
    let nuevaCantidad = parseInt(e.target.value, 10) || 1;
    const producto = carrito.find(item => item.key === key);
    nuevaCantidad = Math.min(Math.max(nuevaCantidad, 1), producto.unidades);
    actualizarCantidad(key, nuevaCantidad);
  };

  const handleEliminarProducto = (key) => {
    eliminarProducto(key);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);

  // Al realizar el pedido, navegamos a '/procesoCompra' pasando el carrito en el state
  const pedidoRealizado = () => {
    navigate('/procesoCompra', { state: { carrito } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Carrito de Compras
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Imagen</TableCell>
                  <TableCell align="center">Producto</TableCell>
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carrito.map((producto) => (
                  <TableRow key={producto.key}>
                    <TableCell align="center">
                      <img src={producto.imagen} alt={producto.nombre} style={{ width: 100 }} />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{producto.nombre}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">${producto.precio}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={producto.cantidad}
                        onChange={(e) => handleCantidadChange(e, producto.key)}
                        inputProps={{ 
                          min: 1, 
                          max: producto.unidades,
                          style: { width: '80px', textAlign: 'center' }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        ${(producto.precio * producto.cantidad).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminarProducto(producto.key)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <Typography variant="h6">Total:</Typography>
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    <Typography variant="h6">${total}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={pedidoRealizado}>
          Realizar Pedido
        </Button>
      </Grid>
    </Container>
  );
};

export default CarritoCompras;
