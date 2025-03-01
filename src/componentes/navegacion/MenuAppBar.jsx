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
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BookIcon from '@mui/icons-material/Book'; // Icono nuevo para Libro
import { Link, useNavigate } from 'react-router-dom';

const MenuAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  // Agregamos la opción "Libros" al menú
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Libros', icon: <BookIcon />, path: '/libros' }, // Nueva entrada
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Menú lateral */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <IconButton edge="start" aria-label="store" color="inherit">
              <StorefrontIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              GERMANSTORE
            </Typography>
          </Box>

          {/* Botones de acceso directo */}
          <Box display="flex" gap={2}>
            {/* Botón para Libros */}
            <Button 
              color="inherit" 
              component={Link}
              to="/productos"
              sx={{ fontWeight: 'bold' }}
            >
              Productos
            </Button>

            {/* Botón de Login */}
            <Button 
              color="inherit" 
              component={Link}
              to="/login"
              sx={{ fontWeight: 'bold' }}
            >
              Login
            </Button>
             {/* Botón de carrito de compra */}
             <Button 
              color="inherit" 
              component={Link}
              to="/carritoCompras"
              sx={{ fontWeight: 'bold' }}
            >
              Carrito
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable */}
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




