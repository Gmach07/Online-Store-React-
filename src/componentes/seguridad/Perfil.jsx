// src/components/Perfil.jsx
import React, { useState } from 'react';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Email,
  LocationOn,
  Payment,
  History,
  Person,
  Lock
} from '@mui/icons-material';
import { useStateValue } from '../../contexto/store';
import { actualizarPerfilUsuario } from '../../actions/UsuarioActions';
import { uploadImage } from '../../firebase';

const Perfil = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  if (!sesionUsuario?.usuario || !sesionUsuario.usuario.id) {
    return <Typography sx={{ m: 4 }}>Cargando datos de usuario...</Typography>;
  }

  const [nombre, setNombre] = useState(sesionUsuario.usuario.nombre || '');
  const [apellido, setApellido] = useState(sesionUsuario.usuario.apellido || '');
  const [username, setUsername] = useState(sesionUsuario.usuario.username || '');
  const [email] = useState(sesionUsuario.usuario.email || '');
  const [nuevaPass, setNuevaPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenURL, setImagenURL] = useState(sesionUsuario.usuario.imagen || '');

  const handleGuardar = async () => {
    if (nuevaPass && nuevaPass !== confirmPass) {
      alert('La contraseña no coincide con la confirmación.');
      return;
    }

    let urlImagenFinal = sesionUsuario.usuario.imagen || '';

    if (imagenFile) {
      try {
        urlImagenFinal = await uploadImage(imagenFile);
      } catch (error) {
        console.error('Error subiendo imagen:', error);
        alert('No se pudo subir la imagen.');
        return;
      }
    }

    const datosActualizar = {
      id: sesionUsuario.usuario.id,
      email: sesionUsuario.usuario.email,
      nombre,
      apellido,
      username,
      password: nuevaPass?.trim() ? nuevaPass.trim() : undefined,
      imagen: urlImagenFinal
    };

    try {
      setGuardando(true);
      await actualizarPerfilUsuario(datosActualizar, dispatch);
      alert('Perfil actualizado correctamente.');

      // Actualizar localmente la imagen
      setImagenFile(null);
      setImagenURL(urlImagenFinal);
      setNuevaPass('');
      setConfirmPass('');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert(`Error al actualizar perfil: ${error}`);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Mi Perfil
            </Typography>

            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid',
                  borderColor: 'primary.main'
                }}
                src={imagenURL || 'https://i.pravatar.cc/300'}
              />
            </Box>

            <Box display="flex" justifyContent="center" mb={3}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 1 }}
              >
                Seleccionar Imagen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagenFile(e.target.files[0]);
                      const preview = URL.createObjectURL(e.target.files[0]);
                      setImagenURL(preview);
                    }
                  }}
                />
              </Button>
            </Box>

            <form>
              <TextField
                sx={{ mb: 2 }}
                label="Nombre"
                variant="outlined"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                sx={{ mb: 2 }}
                label="Apellido"
                variant="outlined"
                fullWidth
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                sx={{ mb: 2 }}
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                sx={{ mb: 2 }}
                label="Correo"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                disabled
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />
                }}
              />

              <Divider sx={{ my: 2 }} />

              <TextField
                sx={{ mb: 2 }}
                label="Nueva Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={nuevaPass}
                onChange={(e) => setNuevaPass(e.target.value)}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                }}
              />

              <TextField
                sx={{ mb: 2 }}
                label="Confirmar Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, fontWeight: 700, py: 1.5, borderRadius: '12px' }}
                onClick={handleGuardar}
                disabled={guardando}
              >
                {guardando ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Actividad Reciente
            </Typography>

            <List>
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <History color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Pedido #12345"
                  secondary="Entregado el 15 de marzo, 2024"
                />
              </ListItem>
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Dirección Principal"
                  secondary="Calle Falsa 123, Ciudad, País"
                />
              </ListItem>
              <ListItem sx={{ mb: 1 }}>
                <ListItemIcon>
                  <Payment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Método de Pago"
                  secondary="Tarjeta Visa **** 1234"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Perfil;
