import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    rol: "Comprador",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulación de obtención del usuario por ID
    // Reemplaza esta parte por una llamada a API según tu backend
    const fetchUsuario = async () => {
      const data = {
        id,
        nombre: `Comprador ${id}`,
        email: `comprador${id}@example.com`,
        telefono: "555-0000",
        direccion: "Calle Falsa 456",
        rol: "Comprador",
      };
      setUsuario(data);
    };
    fetchUsuario();
  }, [id]);

  const validate = () => {
    let temp = {};
    temp.nombre = usuario.nombre ? "" : "El nombre es requerido.";
    temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(usuario.email)
      ? ""
      : "El email es inválido.";
    temp.telefono = usuario.telefono ? "" : "El teléfono es requerido.";
    temp.direccion = usuario.direccion ? "" : "La dirección es requerida.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (field, value) => {
    setUsuario({ ...usuario, [field]: value });
  };

  const handleSave = () => {
    if (validate()) {
      // Aquí se simula la actualización del usuario
      console.log("Guardando usuario:", usuario);
      // En producción se haría una llamada a la API para actualizar
      navigate("/usuarios");
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto", marginTop: 16 }}>
      <Typography variant="h6" gutterBottom>
        Editar Comprador
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            fullWidth
            value={usuario.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            error={!!errors.nombre}
            helperText={errors.nombre}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={usuario.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Teléfono"
            fullWidth
            value={usuario.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
            error={!!errors.telefono}
            helperText={errors.telefono}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Dirección"
            fullWidth
            value={usuario.direccion}
            onChange={(e) => handleChange("direccion", e.target.value)}
            error={!!errors.direccion}
            helperText={errors.direccion}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <Button onClick={() => navigate("/usuarios")} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditarUsuario;

