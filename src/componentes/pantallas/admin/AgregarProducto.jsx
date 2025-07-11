import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";

import { registrarProducto } from "../../../actions/ProductoActions"; // ruta corregida

const AgregarProducto = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    unidades: "",
    marcaId: null,
    categoriaId: null,
    file: null,
    preview: null
  });

  const handleChange = (field, value) => {
    setProducto({ ...producto, [field]: value });
  };

  const handleAgregar = async () => {
    try {
      await registrarProducto(producto);
      navigate("/listaProductos");
    } catch (error) {
      console.error("Error al registrar producto:", error);
    }
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
            onChange={(e) =>
              handleChange(
                "precio",
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </Grid>

        {/* SUBIDA DE IMAGEN */}
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Subir Imagen
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const previewURL = URL.createObjectURL(file);
                  setProducto((prev) => ({
                    ...prev,
                    file: file,
                    preview: previewURL
                  }));
                }
              }}
            />
          </Button>
        </Grid>

        {/* PREVISUALIZACIÓN */}
        {producto.preview && (
          <Grid item xs={12}>
            <img
              src={producto.preview}
              alt="Previsualización"
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                border: "1px solid #ccc"
              }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            label="Unidades"
            type="number"
            fullWidth
            value={producto.unidades}
            onChange={(e) =>
              handleChange(
                "unidades",
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Marca</InputLabel>
            <Select
              value={producto.marcaId || ""}
              label="Marca"
              onChange={(e) => handleChange("marcaId", parseInt(e.target.value))}
            >
              <MenuItem value={1}>Adidas</MenuItem>
              <MenuItem value={2}>Nike</MenuItem>
              <MenuItem value={3}>ReBook</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={producto.categoriaId || ""}
              label="Categoría"
              onChange={(e) => handleChange("categoriaId", parseInt(e.target.value))}
            >
              <MenuItem value={1}>Zapatillas</MenuItem>
              <MenuItem value={2}>Ropa Deportiva</MenuItem>
              <MenuItem value={3}>Accesorios</MenuItem>
            </Select>
          </FormControl>
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
