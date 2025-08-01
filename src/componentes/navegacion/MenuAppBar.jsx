// En tu archivo: MenuAppBar.jsx

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Storefront as StorefrontIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { useStateValue } from '../../contexto/store.jsx';
import MenuCliente from './desktop/MenuCliente';
import MenuAdmin from './desktop/MenuAdmin';

const MenuAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const { isAuthenticated, usuario } = sesionUsuario || { isAuthenticated: false, usuario: null };

  // Asumiendo que tu objeto 'usuario' tiene una propiedad 'admin' con valor true/false
  const isAdmin = isAuthenticated && usuario?.admin; // Usamos usuario?.admin directamente

  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  // --- Ítems para la cabecera (AppBar) ---
  const getCabeceraItems = () => {
    if (isAuthenticated) {
      if (isAdmin) {
        // Ítems de cabecera para administradores
        return [
          { text: 'Productos Admin', path: '/listaProductos' },
          { text: 'Usuarios Admin', path: '/usuarios' },
        ];
      } else {
        // Ítems de cabecera para clientes autenticados
        return [
          { text: 'Productos', path: '/productos' },
          { text: 'Carrito', path: '/carritoCompras' },
        ];
      }
    } else {
      // Ítems de cabecera para usuarios no autenticados
      return [
        { text: 'Login', path: '/login' },
        { text: 'Registro', path: '/registro' },
      ];
    }
  };

  // --- Ítems para el Drawer (menú hamburguesa) ---
  const getDrawerItems = () => {
    const commonItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Acerca de', icon: <InfoIcon />, path: '/acerca' },
    ];

    if (isAuthenticated) {
      if (isAdmin) {
        // Ítems del Drawer para administradores (todas las funciones de App.jsx)
        return [
          ...commonItems,
          { text: 'Dashboard Admin', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Gestionar Productos', icon: <StorefrontIcon />, path: '/listaProductos' },
          { text: 'Agregar Producto', icon: <StorefrontIcon />, path: '/agregarProducto' },
          { text: 'Gestionar Usuarios', icon: <GroupIcon />, path: '/usuarios' },
          { text: 'Lista de Pedidos Admin', icon: <ReceiptIcon />, path: '/listaPedidos' },
        ];
      } else {
        // Ítems del Drawer para clientes autenticados
        return [
          ...commonItems,
          { text: 'Mis Pedidos', icon: <ShoppingCartIcon />, path: '/misPedidos' },
          { text: 'Perfil', icon: <PersonIcon />, path: '/perfil' },
        ];
      }
    } else {
      // Ítems del Drawer para usuarios no autenticados
      return [
        ...commonItems,
        { text: 'Login', icon: <PersonIcon />, path: '/login' },
        { text: 'Registro', icon: <PersonIcon />, path: '/registro' },
      ];
    }
  };

  const cabeceraItems = getCabeceraItems();
  const drawerItems = getDrawerItems();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Botón de hamburguesa para abrir el Drawer */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo y título de la tienda */}
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <StorefrontIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              GERMANSTORE
            </Typography>
          </Box>

          {/* Elementos del lado derecho de la AppBar */}
          <Box display="flex" gap={2} alignItems="center">
            {cabeceraItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ fontWeight: 'bold' }}
              >
                {item.text}
              </Button>
            ))}

            {/* Renderizado condicional del menú de usuario/admin */}
            {isAuthenticated && (
              isAdmin ? (
                <MenuAdmin usuario={usuario} onLogout={handleLogout} />
              ) : (
                <MenuCliente />
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (menú lateral) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((item, idx) => (
              // El comentario problemático ha sido eliminado de aquí
              <ListItem key={idx} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuAppBar;