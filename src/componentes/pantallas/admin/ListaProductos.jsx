import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button
} from '@mui/material';
import { getProductos } from '../../../actions/ProductoActions';
import { useNavigate } from 'react-router-dom';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const res = await getProductos({ PageIndex: 1, PageSize: 20 });
      setProductos(res.data || []);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!productos.length) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">No hay productos disponibles.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Lista de Productos
      </Typography>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={producto.imagen || 'https://via.placeholder.com/250'}
                alt={producto.nombre}
              />
              <CardContent>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {producto.descripcion}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  ${producto.precio}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/editarProducto/${producto.id}`)}
                >
                  Editar Producto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListaProductos;
