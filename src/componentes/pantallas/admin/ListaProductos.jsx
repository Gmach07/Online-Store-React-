import React, { useState } from "react";
import {ProductoArray} from "../../data/dataPruebas";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListaProductos = () => {
  // Guardamos los productos en el estado local
  const [productos, setProductos] = useState(ProductoArray);
  const navigate = useNavigate();

  // Función para borrar un producto de la lista
  const handleDelete = (key) => {
    setProductos(productos.filter((producto) => producto.key !== key));
  };

  // Función para editar un producto
  const handleEdit = (producto) => {
    // Navega a la ruta de edición, por ejemplo, /editarProducto/:key
    navigate(`/editarProducto/${producto.key}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.key}>
            <Card>
              <CardMedia
                component="img"
                alt={producto.nombre}
                height="200"
                image={producto.imagen}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {producto.descripcion}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Precio: ${producto.precio}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Unidades: {producto.unidades}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Marca: {producto.marca}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Temporada: {producto.temporada}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleEdit(producto)}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(producto.key)}>
                  Borrar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Botón para agregar un nuevo producto */}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/agregarProducto")}>
          Agregar Producto
        </Button>
      </Box>
    </Box>
  );
};

export default ListaProductos;


