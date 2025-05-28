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
// MenuCliente se renderiza dentro de MenuAppBar, no necesita ser importado aquí para renderizarlo como children
// import MenuCliente from './componentes/navegacion/desktop/MenuCliente'; 
import Usuarios from './componentes/pantallas/admin/Usuarios';
import EditarUsuario from './componentes/pantallas/admin/EditarUsuario';
import ListaProductos from './componentes/pantallas/admin/ListaProductos';
import AgregarProducto from './componentes/pantallas/admin/AgregarProducto';
import EditarProducto from './componentes/pantallas/admin/EditarProducto';
import ListaPedidos from './componentes/pantallas/admin/ListaPedidos';
import { getUsuario } from './actions/UsuarioActions';
import { useStateValue } from './contexto/store.jsx';

import { v4 as uuidv4 } from 'uuid'; // Importa uuidv4 para generar IDs únicos

function App() {
  // Desestructuramos tanto el estado como el dispatch
  // para poder acceder a 'sesionUsuario' y 'dispatch'
  const [{ sesionUsuario }, dispatch] = useStateValue();

  useEffect(() => {
    // --- Lógica de Autenticación de Usuario ---
    const token = localStorage.getItem('token');
    if (token) {
      getUsuario()
        .then(usuario => {
          if (usuario) {
            // Si el usuario está autenticado, despacha la acción LOGIN
            dispatch({ type: 'LOGIN', payload: { usuario } });
          } else {
            // Si el token no es válido o el usuario no se encuentra, limpia el token
            localStorage.removeItem('token');
            // Opcional: despachar una acción de LOGOUT aquí si lo necesitas
            console.log("Token inválido o usuario no encontrado. Sesión expirada.");
          }
        })
        .catch(err => {
          console.error("Error al obtener usuario autenticado:", err);
          localStorage.removeItem('token'); // Limpiar token en caso de error
        });
    }

    // --- Lógica para el ID del Carrito de Compras (UUID v4) ---
    // Verifica si ya existe un carritoId en localStorage
    let currentCarritoId = localStorage.getItem('carritoId');

    if (!currentCarritoId) {
      // Si no existe, genera un nuevo UUID v4
      currentCarritoId = uuidv4();
      // Guarda el nuevo UUID en localStorage para persistencia entre sesiones del navegador
      localStorage.setItem('carritoId', currentCarritoId);
      console.log("🛒 Nuevo Carrito ID generado y guardado:", currentCarritoId);
    } else {
      // Si ya existe, lo recupera
      console.log("🛒 Carrito ID existente recuperado:", currentCarritoId);
    }

    // Despacha una acción para almacenar el carritoId en el estado global del contexto
    dispatch({ type: 'SET_CARRITO_ID', payload: { carritoId: currentCarritoId } });

  }, [dispatch]); // Asegúrate de que 'dispatch' sea una dependencia para useEffect

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          {/* MenuAppBar no debe tener children directamente, ya que no los renderiza por defecto.
              MenuCliente se renderiza dentro de MenuAppBar si isAuthenticated es true. */}
          <MenuAppBar /> 

          <Routes>
            {/* Redirige la ruta raíz. Si el usuario está autenticado, va a /productos.
                De lo contrario, va a /login. Esto evita que un usuario logueado
                siempre sea redirigido a login al cargar la app.
                
                **CORRECCIÓN:** Se añade un operador de encadenamiento opcional (?.)
                y un valor por defecto (false) para manejar el caso donde sesionUsuario
                pueda ser undefined o null al inicio de la renderización.
            */}
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
            {/* Rutas de administrador */}
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
            <Route path="/listaProductos" element={<ListaProductos />} />
            <Route path="/agregarProducto" element={<AgregarProducto />} />
            <Route path="/editarProducto/:key" element={<EditarProducto />} />
            <Route path="/listaPedidos" element={<ListaPedidos />} />
            {/* Ruta comodín para cualquier otra ruta no definida */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;