// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  TextField,
  Button,
  Link,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useStateValue } from '../../contexto/store.jsx'; // Hook personalizado
import { loginUsuario } from '../../actions/UsuarioActions';

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useStateValue(); // Consumir contexto como [state, dispatch]
  const isAuthenticated = state.auth?.isAuthenticated;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Redirige si ya está autenticado (por si entra directamente estando logueado)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/productos');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setOpenDialog(false);

    try {
      // Intentamos el login y esperamos que dispatch actualice el estado
      await loginUsuario({ email, password }, dispatch);
      // Tras login exitoso, forzamos navegación
      navigate('/productos');
    } catch (err) {
      setErrorMsg(err.message || 'Usuario o contraseña incorrecta');
      setOpenDialog(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Card sx={{ p: 3, mt: 3, width: '100%', borderRadius: 2 }} variant="outlined">
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ 'data-testid': 'email-input' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ 'data-testid': 'password-input' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
              data-testid="login-button"
            >
              INGRESAR
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/registro"
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  ¿No tienes cuenta? Regístrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>

      {/* Diálogo de error */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title">Error de Autenticación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)} 
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;
