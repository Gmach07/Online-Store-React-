// Proyecto-Curso-React-/src/components/seguridad/Login.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Link, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../actions/UsuarioActions';
import { useStateValue } from '../../contexto/store';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUsuario(credentials, dispatch); // Pasa dispatch
      dispatch({ type: 'OPEN_SNACKBAR', payload: { open: true, mensaje: '¡Inicio de sesión exitoso!' } });
      navigate('/productos');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      dispatch({ type: 'OPEN_SNACKBAR', payload: { open: true, mensaje: `Error al iniciar sesión: ${error.message || error}` } });
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
            : theme.palette.background.default
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Iniciar Sesión
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Correo Electrónico"
            type="email"
            variant="filled"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            required
            autoFocus
            autoComplete="email"
            InputProps={{ disableUnderline: true }}
            sx={{ '& .MuiFilledInput-root': { borderRadius: 1, backgroundColor: 'action.hover' } }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="filled"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="current-password"
            InputProps={{ disableUnderline: true }}
            sx={{ '& .MuiFilledInput-root': { borderRadius: 1, backgroundColor: 'action.hover' } }}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold', borderRadius: 1, textTransform: 'none' }}
          >
            INGRESAR
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2, '& a': { textDecoration: 'none', '&:hover': { textDecoration: 'underline' } } }}>
            <Link component={RouterLink} to="/registro" variant="body2" color="text.secondary">
              ¿No tienes cuenta? Regístrate
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;