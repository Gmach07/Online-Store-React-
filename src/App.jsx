import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import Productos from './componentes/pantallas/Productos';
import DetalleProducto from './componentes/pantallas/DetalleProducto';
import CarritoCompras from './componentes/pantallas/CarritoCompras';

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.key === producto.key);
      if (existe) {
        return prev.map(item =>
          item.key === producto.key
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prev, producto];
    });
  };

  const actualizarCantidad = (key, nuevaCantidad) => {
    setCarrito(prev =>
      prev.map(item =>
        item.key === key ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarProducto = (key) => {
    setCarrito(prev => prev.filter(item => item.key !== key));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <MenuAppBar />

          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistrarUsuario />} />
            <Route path="/productos" element={<Productos />} />
            <Route 
              path="/detalleProducto/:id" 
              element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} 
            />
            <Route 
              path="/carritoCompras" 
              element={
                <CarritoCompras 
                  carrito={carrito}
                  actualizarCantidad={actualizarCantidad}
                  eliminarProducto={eliminarProducto}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;