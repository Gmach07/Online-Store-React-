import React, { useEffect } from 'react';
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../contexto/store.jsx';
import { getCarritoCompra } from '../../actions/CarritoCompraActions.jsx';

const CarritoCompras = () => {
  // Desestructuramos el estado del carrito y del usuario, y el dispatch
  const [{ sesionCarrito, sesionUsuario, carritoId }, dispatch] = useStateValue(); // Asegúrate de obtener carritoId aquí
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario está autenticado, intenta obtener su carrito de compra.
    // Aquí se debería usar el carritoId si es un carrito anónimo, o el userId si es un carrito de usuario.
    // Por simplicidad, si sesionUsuario.usuario.id existe, se asume un carrito de usuario.
    // Si no, se debería usar el carritoId generado por uuidv4.
    // **CORRECCIÓN**: Añadido '?' para acceder de forma segura a 'sesionUsuario.usuario'
    if (sesionUsuario?.usuario?.id) { 
      console.log("🛒 Intentando obtener carrito para usuario:", sesionUsuario.usuario.id);
      getCarritoCompra(dispatch, sesionUsuario.usuario.id);
    } else if (carritoId) {
      console.log("🛒 Intentando obtener carrito anónimo con ID:", carritoId);
      // Aquí deberías llamar a una función para obtener el carrito anónimo usando el carritoId
      // Por ejemplo: getCarritoAnonimo(dispatch, carritoId);
      // Por ahora, si no tienes una acción específica, solo logueamos.
      // Si tu getCarritoCompra puede manejar tanto userId como carritoId, úsala.
      getCarritoCompra(dispatch, carritoId); // Asumiendo que getCarritoCompra puede usar carritoId
    }
  }, [sesionUsuario?.usuario, carritoId, dispatch]); // Añade carritoId a las dependencias y usa '?' en sesionUsuario.usuario

  const handleCantidadChange = (e, id) => {
    const val = parseInt(e.target.value, 10) || 1;
    const item = sesionCarrito.items.find(i => i.id === id);
    const cantidad = Math.min(Math.max(val, 1), item.stock);
    const updatedItems = sesionCarrito.items.map(i => i.id === id ? { ...i, cantidad } : i);
    
    dispatch({ type: 'CARRITO_ITEMS', items: updatedItems });
    
    // --- CONSOLE.LOG PARA VER LO QUE SE PREPARA PARA GUARDAR EN REDIS ---
    console.log("🛒 Cantidad de ítem actualizada. Datos a enviar a Redis (conceptual):", {
      carritoId: sesionUsuario?.usuario?.id || carritoId, // Usa el ID de usuario o el ID del carrito anónimo
      items: updatedItems
    });
    // Aquí es donde harías la llamada a tu acción de backend para actualizar el carrito en Redis
    // Por ejemplo: updateCarritoEnRedis(sesionUsuario.usuario?.id || carritoId, updatedItems);
  };

  const handleEliminar = id => {
    const updatedItems = sesionCarrito.items.filter(i => i.id !== id);
    
    dispatch({ type: 'CARRITO_ITEMS', items: updatedItems });

    // --- CONSOLE.LOG PARA VER LO QUE SE PREPARA PARA GUARDAR EN REDIS ---
    console.log("🛒 Ítem eliminado. Datos a enviar a Redis (conceptual):", {
      carritoId: sesionUsuario?.usuario?.id || carritoId, // Usa el ID de usuario o el ID del carrito anónimo
      items: updatedItems
    });
    // Aquí es donde harías la llamada a tu acción de backend para actualizar el carrito en Redis
    // Por ejemplo: updateCarritoEnRedis(sesionUsuario.usuario?.id || carritoId, updatedItems);
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