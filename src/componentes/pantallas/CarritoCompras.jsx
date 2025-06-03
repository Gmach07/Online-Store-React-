// src/componentes/pantallas/CarritoCompras.jsx
import React, { useEffect } from 'react';
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../contexto/store.jsx';
import { getCarritoCompra } from '../../actions/CarritoCompraActions.jsx';

const CarritoCompras = () => {
  const [{ sesionCarrito, sesionUsuario, carritoId }, dispatch] = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (sesionUsuario?.usuario?.id) {
      console.log("🛒 Intentando obtener carrito para usuario:", sesionUsuario.usuario.id);
      getCarritoCompra(dispatch, sesionUsuario.usuario.id);
    } else if (carritoId) {
      console.log("🛒 Intentando obtener carrito anónimo con ID:", carritoId);
      getCarritoCompra(dispatch, carritoId);
    }
  }, [sesionUsuario?.usuario, carritoId, dispatch]);

  // Persistir ítems en localStorage cuando cambien
  useEffect(() => {
    if (!sesionUsuario?.usuario?.id && carritoId) {
      localStorage.setItem(`carritoItems_${carritoId}`, JSON.stringify(sesionCarrito.items));
    }
  }, [sesionCarrito.items, sesionUsuario, carritoId]);

  const handleCantidadChange = (e, id) => {
    const val = parseInt(e.target.value, 10) || 1;
    const item = sesionCarrito.items.find(i => i.id === id);
    const cantidad = Math.min(Math.max(val, 1), item.stock);
    const updatedItems = sesionCarrito.items.map(i => i.id === id ? { ...i, cantidad } : i);
    dispatch({ type: 'CARRITO_ITEMS', items: updatedItems });
    console.log("🛒 Cantidad de ítem actualizada. Datos a enviar a Redis (conceptual):", {
      carritoId: sesionUsuario?.usuario?.id || carritoId,
      items: updatedItems
    });
  };

  const handleEliminar = id => {
    const updatedItems = sesionCarrito.items.filter(i => i.id !== id);
    dispatch({ type: 'CARRITO_ITEMS', items: updatedItems });
    console.log("🛒 Ítem eliminado. Datos a enviar a Redis (conceptual):", {
      carritoId: sesionUsuario?.usuario?.id || carritoId,
      items: updatedItems
    });
  };

  const total = sesionCarrito.items.reduce((sum, i) => sum + i.precio * i.cantidad, 0).toFixed(2);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Carrito de Compras</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead><TableRow>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">Producto</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow></TableHead>
              <TableBody>
                {sesionCarrito.items.map(prod => (
                  <TableRow key={prod.id}>
                    <TableCell align="center"><img src={prod.imagen} alt={prod.nombre} style={{ width: 100 }} /></TableCell>
                    <TableCell align="center"><Typography variant="h6">{prod.nombre}</Typography></TableCell>
                    <TableCell align="center"><Typography variant="h6">${prod.precio}</Typography></TableCell>
                    <TableCell align="center">
                      <TextField type="number" variant="outlined" size="small"
                        value={prod.cantidad}
                        onChange={e => handleCantidadChange(e, prod.id)}
                        inputProps={{ min:1, max: prod.stock, style:{ width:'80px', textAlign:'center' } }}
                      />
                    </TableCell>
                    <TableCell align="center"><Typography variant="h6">${(prod.precio*prod.cantidad).toFixed(2)}</Typography></TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary" onClick={()=>handleEliminar(prod.id)}>Eliminar</Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right"><Typography variant="h6">Total:</Typography></TableCell>
                  <TableCell colSpan={2} align="center"><Typography variant="h6">${total}</Typography></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt:2 }}>
        <Button variant="contained" color="primary" onClick={()=>navigate('/procesoCompra')}>Realizar Pedido</Button>
      </Grid>
    </Container>
  );
};

export default CarritoCompras;