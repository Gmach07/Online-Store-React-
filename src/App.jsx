// App.jsx
import React, { useEffect , useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme/theme';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import Productos from './componentes/pantallas/Productos';
import DetalleProducto from './componentes/pantallas/DetalleProducto';
import CarritoCompras from './componentes/pantallas/CarritoCompras';
import ProcesoCompra from './componentes/pantallas/ProcesoCompra';
import OrdenCompra from './componentes/pantallas/OrdenCompra';
import Perfil from './componentes/seguridad/Perfil';
import MenuCliente from './componentes/navegacion/desktop/MenuCliente';
import Usuarios from './componentes/pantallas/admin/Usuarios';
import EditarUsuario from './componentes/pantallas/admin/EditarUsuario';
import ListaProductos from './componentes/pantallas/admin/ListaProductos';
import AgregarProducto from './componentes/pantallas/admin/AgregarProducto';
import EditarProducto from './componentes/pantallas/admin/EditarProducto';
import ListaPedidos from './componentes/pantallas/admin/ListaPedidos';
import { getUsuario } from './actions/UsuarioActions';

function App() {
  // Estado para el carrito de compras

  const [carrito, setCarrito] = useState([]);
  const [servidorRespuesta, setServidorRespuesta] = useState(false);

  useEffect(()=> {
    getUsuario().then((response) => {
      if (response) {
        setServidorRespuesta(true);
      }
    }).catch((error) => {
      console.error('Error al obtener el usuario:', error);
    });
  })



  // 1) Agregar al carrito: ahora con id
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prev, producto];
    });
  };

  // 2) Actualizar cantidad por id
  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  // 3) Eliminar producto por id
  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
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
            <Route path="/menuCliente" element={<MenuCliente />} />

            <Route
              path="/detalleProducto/:id"
              element={
                <DetalleProducto
                  agregarAlCarrito={agregarAlCarrito}
                />
              }
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

            <Route
              path="/procesoCompra"
              element={<ProcesoCompra carrito={carrito} />}
            />

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