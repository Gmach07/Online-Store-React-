import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from "@mui/material";

// Asegúrate de ajustar la ruta al archivo real:
import {ProductoArray} from "../../data/dataPruebas";

const AgregarProducto = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    unidades: 0,
    marca: "",
    temporada: ""
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (field, value) => {
    setProducto({ ...producto, [field]: value });
  };

  // Agrega el producto al array
  const handleAgregar = () => {
    // Generamos un key único (puedes usar Date.now() o cualquier otra lógica)
    const newKey = Date.now();
    const nuevoProducto = { ...producto, key: newKey };

    // Aquí se agrega el producto directamente al array de pruebas
    ProductoArray.push(nuevoProducto);

    console.log("Producto agregado:", nuevoProducto);

    // Redirige a la lista de productos (ajusta la ruta según tu caso)
    navigate("/listaProductos");
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto", marginTop: 16 }}>
      <Typography variant="h6" gutterBottom>
        Agregar Producto
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            fullWidth
            value={producto.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            fullWidth
            value={producto.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={producto.precio}
            onChange={(e) => handleChange("precio", parseFloat(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Imagen"
            fullWidth
            value={producto.imagen}
            onChange={(e) => handleChange("imagen", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Unidades"
            type="number"
            fullWidth
            value={producto.unidades}
            onChange={(e) => handleChange("unidades", parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Marca"
            fullWidth
            value={producto.marca}
            onChange={(e) => handleChange("marca", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Temporada"
            fullWidth
            value={producto.temporada}
            onChange={(e) => handleChange("temporada", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleAgregar}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AgregarProducto;
