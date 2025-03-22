import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductoArray } from "../../data/dataPruebas";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from "@mui/material";

const EditarProducto = () => {
  const { key } = useParams();             // key del producto desde la URL
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    key: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    unidades: 0,
    marca: "",
    temporada: ""
  });

  useEffect(() => {
    // Buscar el producto en el array según el key
    const productoEncontrado = ProductoArray.find(
      (p) => p.key === parseInt(key)
    );
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [key]);

  // Maneja los cambios de cada campo
  const handleChange = (campo, valor) => {
    setProducto({ ...producto, [campo]: valor });
  };

  // Guarda los cambios en el array de productos
  const handleSave = () => {
    // Localiza el índice del producto para actualizarlo
    const index = ProductoArray.findIndex((p) => p.key === parseInt(key));
    if (index !== -1) {
      // Actualiza el producto en el array
      ProductoArray[index] = { ...producto };
    }
    // Redirige a la lista de productos
    navigate("/listaProductos");
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto", marginTop: 16 }}>
      <Typography variant="h6" gutterBottom>
        Editar Producto
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
            onChange={(e) =>
              handleChange("precio", parseFloat(e.target.value) || 0)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Imagen (URL)"
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
            onChange={(e) =>
              handleChange("unidades", parseInt(e.target.value) || 0)
            }
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
          <Button onClick={() => navigate("/listaProductos")} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditarProducto;
