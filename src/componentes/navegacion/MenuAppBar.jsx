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
import Person from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import MenuCliente from './desktop/MenuCliente'; // Ajusta la ruta si está en otro directorio


const MenuAppBar = ({ usuario }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Usuarios' , icon: <Person/>, path: '/usuarios'},
    { text: 'Productos', icon: <StorefrontIcon />, path: '/productos' },
    { text: 'Detalle Producto', icon: <InfoIcon />, path: '/detalleProducto' },
    { text: 'Carrito', icon: <ShoppingCartIcon />, path: '/carritoCompras' },
    {text: 'ListaProductos',  icon: <StorefrontIcon />, path: '/listaProductos'},
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Botón para abrir el Drawer (menú lateral) */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo + Nombre tienda */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <StorefrontIcon fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              GERMANSTORE
            </Typography>
          </Box>

          {/* Sección de botones y menú cliente */}
          <Box display="flex" gap={2} alignItems="center">
            <Button 
              color="inherit" 
              component={Link}
              to="/productos"
              sx={{ fontWeight: 'bold' }}
            >
              Productos
            </Button>

            <Button 
              color="inherit" 
              component={Link}
              to="/carritoCompras"
              sx={{ fontWeight: 'bold' }}
            >
              Carrito
            </Button>

            {/* Menú del cliente con Avatar y nombre */}
            <MenuCliente usuario={usuario} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú lateral (Drawer) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
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






