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
            <Route path="/menuCliente" element= {<MenuCliente/>} />
            {/* Se pasa el carrito como prop para que ProcesoCompra siempre tenga acceso */}
            <Route path="/procesoCompra" element={<ProcesoCompra carrito={carrito} />} />  
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/editarUsuario/:id" element={<EditarUsuario />} /> 
            <Route path="/listaProductos" element={<ListaProductos />} />
            <Route path = "/agregarProducto" element={<AgregarProducto/>} />
            <Route path="/editarProducto/:key" element={<EditarProducto />} />
            <Route path="/listaPedidos" element={<ListaPedidos />} />
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
            {/* Se pasa el carrito como prop para que OrdenCompra siempre tenga acceso */}
            <Route path="/ordenCompra/:id" element={<OrdenCompra />} />
            <Route path="/perfil" element={<Perfil/>} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

