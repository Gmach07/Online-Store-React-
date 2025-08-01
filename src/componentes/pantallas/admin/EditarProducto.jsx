// src/pages/EditarProducto.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { getProductosById, actualizarProducto } from "../../../actions/ProductoActions";

const EditarProducto = () => {
  // Ajuste: obtener el parámetro correcto según la ruta
  const params = useParams();
  const productoId = params.id ?? params.key;
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    unidades: 0,
    marcaId: "",
    categoriaId: "",
    file: null,
    preview: null
  });

  useEffect(() => {
    async function fetchProducto() {
      try {
        const data = await getProductosById(productoId);
        setProducto({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          precio: data.precio ?? 0,
          imagen: data.imagen ?? "",
          unidades: data.stock ?? 0,
          marcaId: data.marcaId ?? "",
          categoriaId: data.categoriaId ?? "",
          file: null,
          preview: data.imagen ?? null
        });
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    }
    if (productoId) fetchProducto();
  }, [productoId]);

  const handleChange = (field, value) => {
    setProducto(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await actualizarProducto(productoId, producto);
      navigate("/listaProductos");
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Editar Producto
      </Typography>
      <Grid container spacing={2}>
        {/* Nombre */}
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            fullWidth
            value={producto.nombre}
            onChange={e => handleChange("nombre", e.target.value)}
          />
        </Grid>
        {/* Descripción */}
        <Grid item xs={12}>
          <TextField
            label="Descripción"
            fullWidth
            value={producto.descripcion}
            onChange={e => handleChange("descripcion", e.target.value)}
          />
        </Grid>
        {/* Precio */}
        <Grid item xs={12}>
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={producto.precio}
            onChange={e => handleChange("precio", parseFloat(e.target.value) || 0)}
          />
        </Grid>
        {/* Imagen */}
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Cambiar Imagen
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setProducto(prev => ({
                    ...prev,
                    file,
                    preview: URL.createObjectURL(file)
                  }));
                }
              }}
            />
          </Button>
          {producto.preview && (
            <img
              src={producto.preview}
              alt="Preview"
              style={{ marginTop: 16, width: "100%", maxHeight: 200, objectFit: "contain" }}
            />
          )}
        </Grid>
        {/* Unidades */}
        <Grid item xs={12}>
          <TextField
            label="Unidades"
            type="number"
            fullWidth
            value={producto.unidades}
            onChange={e => handleChange("unidades", parseInt(e.target.value) || 0)}
          />
        </Grid>
        {/* Marca */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="label-marca">Marca</InputLabel>
            <Select
              labelId="label-marca"
              value={producto.marcaId}
              label="Marca"
              onChange={e => handleChange("marcaId", e.target.value)}
            >
              <MenuItem value={1}>Adidas</MenuItem>
              <MenuItem value={2}>Nike</MenuItem>
              <MenuItem value={3}>ReBook</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Categoría */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="label-categoria">Categoría</InputLabel>
            <Select
              labelId="label-categoria"
              value={producto.categoriaId}
              label="Categoría"
              onChange={e => handleChange("categoriaId", e.target.value)}
            >
              <MenuItem value={1}>Zapatillas</MenuItem>
              <MenuItem value={2}>Ropa Deportiva</MenuItem>
              <MenuItem value={3}>Accesorios</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Acciones */}
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Button onClick={() => navigate("/listaProductos")} sx={{ mr: 1 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditarProducto;