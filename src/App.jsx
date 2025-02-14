import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import Libro from './componentes/pantallas/Libro';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <MenuAppBar />

          {/* Contenedor principal de rutas */}
          <Routes>
            {/* Redirección raíz */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rutas principales */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistrarUsuario />} />
            
            {/* Nueva ruta para libros (agregada aquí) */}
            <Route path="/libros" element={<Libro />} />

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;



