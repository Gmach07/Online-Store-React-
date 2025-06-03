// src/App.jsx
import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import Login from './componentes/seguridad/Login';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Productos from './componentes/pantallas/Productos';
import DetalleProducto from './componentes/pantallas/DetalleProducto';
import CarritoCompras from './componentes/pantallas/CarritoCompras';
import ProcesoCompra from './componentes/pantallas/ProcesoCompra';
import OrdenCompra from './componentes/pantallas/OrdenCompra';
import Perfil from './componentes/seguridad/Perfil';
import Usuarios from './componentes/pantallas/admin/Usuarios';
import EditarUsuario from './componentes/pantallas/admin/EditarUsuario';
import ListaProductos from './componentes/pantallas/admin/ListaProductos';
import AgregarProducto from './componentes/pantallas/admin/AgregarProducto';
import EditarProducto from './componentes/pantallas/admin/EditarProducto';
import ListaPedidos from './componentes/pantallas/admin/ListaPedidos';
import { getUsuario } from './actions/UsuarioActions';
import { useStateValue } from './contexto/store.jsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUsuario()
        .then(usuario => {
          if (usuario) dispatch({ type: 'LOGIN', payload: { usuario } });
          else localStorage.removeItem('token');
        })
        .catch(() => localStorage.removeItem('token'));
    }

    let currentCarritoId = localStorage.getItem('carritoId');
    if (!currentCarritoId) {
      currentCarritoId = uuidv4();
      localStorage.setItem('carritoId', currentCarritoId);
      console.log("🛒 Nuevo Carrito ID generado y guardado:", currentCarritoId);
    } else {
      console.log("🛒 Carrito ID existente recuperado:", currentCarritoId);
    }
    dispatch({ type: 'SET_CARRITO_ID', payload: { carritoId: currentCarritoId } });

    // Cargar ítems desde localStorage para carrito anónimo
    const stored = localStorage.getItem(`carritoItems_${currentCarritoId}`);
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'CARRITO_ITEMS', items });
        console.log("🛒 Ítems del carrito cargados desde localStorage:", items);
      } catch (e) {
        console.error("Error parseando ítems de carrito en localStorage", e);
      }
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          <MenuAppBar />
          <Routes>
            <Route
              path="/"
              element={<Navigate to={sesionUsuario?.isAuthenticated ? "/productos" : "/login"} replace />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistrarUsuario />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
            <Route path="/carritoCompras" element={<CarritoCompras />} />
            <Route path="/procesoCompra" element={<ProcesoCompra />} />
            <Route path="/ordenCompra/:id" element={<OrdenCompra />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
            <Route path="/listaProductos" element={<ListaProductos />} />
            <Route path="/agregarProducto" element={<AgregarProducto />} />
            <Route path="/editarProducto/:key" element={<EditarProducto />} />
            <Route path="/listaPedidos" element={<ListaPedidos />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;