import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          {/* Barra de navegación (visible en todas las rutas) */}
          <MenuAppBar />

          {/* Contenido principal con rutas */}
          <Routes>
            {/* Ruta raíz: redirige a login (opcional) */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Ruta para login */}
            <Route path="/login" element={
              <div>
                
                <Login />
              </div>
            } />

            {/* Ruta para registro */}
            <Route path="/registro" element={
              <div>
                <h1></h1>
                <RegistrarUsuario />
              </div>
            } />

            {/* Ruta de fallback para páginas no encontradas */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;


