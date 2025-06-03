// src/componentes/pantallas/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, Paper, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../contexto/store.jsx';
import { getProductosById } from '../../actions/ProductoActions';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ sesionCarrito, sesionUsuario }, dispatch] = useStateValue();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    getProductosById(id).then(setProducto).catch(console.error);
  }, [id]);

  if (!producto) return <Typography>Cargando...</Typography>;

  const handleCantidad = e => {
    const val = parseInt(e.target.value,10)||1;
    setCantidad(Math.min(Math.max(val,1), producto.stock));
  };

  const handleAgregar = () => {
    const existe = sesionCarrito.items.find(i=>i.id===producto.id);
    let items;
    if (existe) {
      items = sesionCarrito.items.map(i=> i.id===producto.id ? {...i, cantidad: i.cantidad+cantidad} : i);
    } else {
      items = [...sesionCarrito.items, { id:producto.id, nombre:producto.nombre, precio:producto.precio, imagen:producto.imagen, stock:producto.stock, cantidad }];
    }
    dispatch({ type:'CARRITO_ITEMS', items });
    // Guardar en localStorage para carrito anónimo
    if (!sesionUsuario?.usuario?.id) {
      const anonId = localStorage.getItem('carritoId');
      localStorage.setItem(`carritoItems_${anonId}`, JSON.stringify(items));
    }
    navigate('/carritoCompras');
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{producto.nombre}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}><Paper><img src={producto.imagen} alt={producto.nombre} style={{ width:'100%' }}/></Paper></Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">${producto.precio}</Typography>
          <Box>
            <Typography>Descripción:</Typography>
            <Typography>{producto.descripcion}</Typography>
          </Box>
          <Box>
            <Typography>Cantidad:</Typography>
            <TextField type="number" value={cantidad} onChange={handleCantidad} inputProps={{ min:1, max:producto.stock }}/>
          </Box>
          <Button variant="contained" color="primary" onClick={handleAgregar}>🛒 Agregar al Carrito</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetalleProducto;
