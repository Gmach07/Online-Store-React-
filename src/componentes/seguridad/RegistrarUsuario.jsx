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
import { Link as RouterLink } from 'react-router-dom';

const clearUsuario = {
  nombre: '',
    apellido: '',
    correo: '',
    password: ''
}

const RegistrarUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    console.log("Usuario registrado:", usuario);
    setUsuario(clearUsuario);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.mode === 'light' 
          ? theme.palette.grey[100] 
          : theme.palette.background.default,
      }}
    >
      <CssBaseline />
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: '400px',
          borderRadius: (theme) => theme.shape.borderRadius,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 4
        }}>
          <Avatar sx={{ 
            m: 1, 
            bgcolor: 'primary.main',
            width: 56,
            height: 56
          }}>
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Crear Cuenta
          </Typography>
        </Box>

        <Box 
          component="form" 
          onSubmit={guardarUsuario}
          //onSubmit={(e)=>e.preventDefault()}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2.5 
          }}
        >
          <TextField
            label="Nombre"
            variant="filled"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            fullWidth
            required
            autoFocus
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 1,
                backgroundColor: 'action.hover',
              }
            }}
          />

          <TextField
            label="Apellido"
            variant="filled"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 1,
                backgroundColor: 'action.hover',
              }
            }}
          />

          <TextField
            label="Correo Electrónico"
            type="email"
            variant="filled"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="email"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 1,
                backgroundColor: 'action.hover',
              }
            }}
          />

          <TextField
            label="Contraseña"
            type="password"
            variant="filled"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="new-password"
            InputProps={{ disableUnderline: true }}
            sx={{
              '& .MuiFilledInput-root': {
                borderRadius: 1,
                backgroundColor: 'action.hover',
              }
            }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 1,
              textTransform: 'none',
            }}
          >
            Registrarse
          </Button>

          <Box sx={{ 
            textAlign: 'center', 
            mt: 2,
            '& a': {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }}>
            <Link 
              component={RouterLink} 
              to="/login" 
              variant="body2"
              color="text.secondary"
            >
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrarUsuario;

