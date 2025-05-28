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
  ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Storefront as StorefrontIcon,
  Info as InfoIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useStateValue } from '../../contexto/store.jsx';
import MenuCliente from './desktop/MenuCliente'; // Asegúrate de que esta ruta sea correcta

const MenuAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Extraemos el slice correcto
  // Aquí la modificación: se asegura que sesionUsuario no sea undefined y tiene isAuthenticated
  const [{ sesionUsuario }] = useStateValue();
  const { isAuthenticated } = sesionUsuario || { isAuthenticated: false }; // Añade un fallback por seguridad

  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  const cabeceraItems = isAuthenticated
    ? [
        { text: 'Productos', path: '/productos' },
        { text: 'Carrito',    path: '/carritoCompras' },
      ]
    : [
        { text: 'Login',    path: '/login' },
        { text: 'Registro', path: '/registro' },
      ];

  const drawerItems = [
    { text: 'Home',     icon: <HomeIcon />,      path: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Mis Pedidos', icon: <ShoppingCartIcon />, path: '/misPedidos' },
          { text: 'Perfil',      icon: <PersonIcon />,       path: '/perfil' },
        ]
      : []
    ),
    { text: 'Acerca de', icon: <InfoIcon />, path: '/acerca' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <StorefrontIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              GERMANSTORE
            </Typography>
          </Box>

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

            {/* Aquí sí mostramos el menú del cliente */}
            {isAuthenticated && <MenuCliente />}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((item, idx) => (
              <ListItem button key={idx} component={Link} to={item.path}>
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