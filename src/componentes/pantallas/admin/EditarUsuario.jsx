import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert
} from "@mui/material";
import { getUsuarioById, agregarRole } from "../../../actions/UsuarioActions";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    email: "",
    rol: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioById(id);
        setUsuario({
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          rol: data.admin ? "Admin" : "Usuario",
        });
        setIsAdmin(data.admin); // ✅ Corrección clave aquí
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleSave = async () => {
    try {
      await agregarRole(usuario.id, isAdmin);
      setSnackbar({
        open: true,
        message: "Usuario actualizado correctamente.",
        severity: "success",
      });
      setTimeout(() => navigate("/usuarios"), 1000); // Opcional: navegar luego de guardar
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setSnackbar({
        open: true,
        message: "Error al guardar usuario.",
        severity: "error",
      });
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 600, margin: "auto", marginTop: 16 }}>
      <Typography variant="h6" gutterBottom>
        Editar Usuario
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Nombre" fullWidth value={usuario.nombre} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" fullWidth value={usuario.email} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                color="primary"
              />
            }
            label="Usuario Administrador"
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EditarUsuario;
