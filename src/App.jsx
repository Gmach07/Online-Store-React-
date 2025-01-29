import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {/* Barra de navegación */}
        <MenuAppBar />

        {/* Contenido principal */}
        <h1>Bienvenido a la Aplicación</h1>
        <RegistrarUsuario />
        <Login />
      </Box>
    </ThemeProvider>
  );
}

export default App;


