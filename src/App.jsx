// src/App.jsx
import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Typography } from '@mui/material'; // <-- Añadido Typography aquí
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
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAndSetUser = async () => {
      if (token) {
        try {
          // Llama a getUsuario y pásale dispatch.
          // getUsuario ahora es responsable de despachar LOGIN o LOGOUT.
          await getUsuario(dispatch);
        } catch (e) {
          console.error("Error al cargar usuario desde token en App.jsx:", e);
          // Si hay un error (ej. token inválido), getUsuario ya debería haber limpiado el token
          // y despachado LOGOUT. Aquí solo aseguramos que el loading termine.
        }
      } else {
        // Si no hay token, no hay usuario para cargar, simplemente terminamos el loading
        // y nos aseguramos de que el estado de sesión esté limpio (LOGOUT).
        dispatch({ type: 'LOGOUT' });
      }
      setLoading(false); // Una vez que se intenta cargar el usuario (o se determina que no hay), el loading termina
    };

    fetchAndSetUser();

    // Lógica para el carrito de compras (se mantiene igual)
    let currentCarritoId = localStorage.getItem('carritoId');
    if (!currentCarritoId) {
      currentCarritoId = uuidv4();
      localStorage.setItem('carritoId', currentCarritoId);
      console.log('🛒 Nuevo Carrito ID generado y guardado:', currentCarritoId);
    } else {
      console.log('🛒 Carrito ID existente recuperado:', currentCarritoId);
    }
    dispatch({ type: 'SET_CARRITO_ID', payload: { carritoId: currentCarritoId } });

    const stored = localStorage.getItem(`carritoItems_${currentCarritoId}`);
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'CARRITO_ITEMS', items });
        console.log('🛒 Ítems del carrito cargados desde localStorage:', items);
      } catch (e) {
        console.error("Error parseando ítems de carrito en localStorage", e);
      }
    }
  }, [dispatch]); // La dependencia 'dispatch' es importante si el dispatch cambia (aunque es raro)

  // Muestra un indicador de carga mientras se verifica la sesión del usuario
  if (loading) {
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
        <Typography variant="h5" color="text.secondary">Cargando aplicación...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnackbar?.open || false}
        autoHideDuration={3000}
        message={openSnackbar?.mensaje || ''}
        onClose={() => dispatch({ type: 'CLOSE_SNACKBAR' })}
      />
      <CssBaseline />
      <Router>
        <Box>
          <MenuAppBar />
          <Routes>
            {/* Redirección inicial basada en el estado de autenticación */}
            <Route
              path="/"
              element={
                <Navigate to={sesionUsuario?.isAuthenticated ? "/productos" : "/login"} replace />
              }
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
            <Route path="*" element={<Navigate to="/login" replace />} /> {/* Ruta comodín para cualquier otra URL */}
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;