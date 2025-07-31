// Proyecto-Curso-React-/src/components/seguridad/RegistrarUsuario.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Link,
  CssBaseline
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../../actions/UsuarioActions';
import { useStateValue } from '../../contexto/store';

const clearUsuario = {
  nombre: '',
  apellido: '',
  username: '',
  email: '',
  password: '',
};

const RegistrarUsuario = () => {
  const [usuario, setUsuario] = useState(clearUsuario);
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      console.log('🏹 Payload enviado:', usuario);
      const data = await registrarUsuario(usuario, dispatch); // Pasa dispatch
      console.log('✅ Usuario registrado:', data);

      setUsuario(clearUsuario);
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: { open: true, mensaje: '¡Registro exitoso! Bienvenido.' },
      });
      navigate('/productos');
    } catch (error) {
      console.error('💥 Error al registrar usuario:', error);
      if (error.response) {
        console.error('💥 error.response.data:', error.response.data);
      } else {
        console.error('💥 error:', error.message);
      }
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: {
          open: true,
          mensaje: `Error al registrar: ${error.message || error}`,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.background.default,
      }}
    >
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: (theme) => theme.shape.borderRadius,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Crear Cuenta
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={guardarUsuario}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
        >
          {['nombre', 'apellido', 'username', 'email', 'password'].map((field) => (
            <TextField
              key={field}
              label={
                field === 'nombre'
                  ? 'Nombre'
                  : field === 'apellido'
                  ? 'Apellido'
                  : field === 'username'
                  ? 'Username'
                  : field === 'email'
                  ? 'Correo Electrónico'
                  : 'Contraseña'
              }
              type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
              variant="filled"
              name={field}
              value={usuario[field]}
              onChange={handleChange}
              fullWidth
              required
              {...(field === 'nombre' ? { autoFocus: true } : {})}
              autoComplete={
                field === 'password' ? 'new-password' : field === 'email' ? 'email' : undefined
              }
              InputProps={{ disableUnderline: true }}
              sx={{ '& .MuiFilledInput-root': { borderRadius: 1, backgroundColor: 'action.hover' } }}
            />
          ))}
          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold', borderRadius: 1, textTransform: 'none' }}
          >
            Registrarse
          </Button>
          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              '& a': { textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            }}
          >
            <Link component={RouterLink} to="/login" variant="body2" color="text.secondary">
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrarUsuario;
