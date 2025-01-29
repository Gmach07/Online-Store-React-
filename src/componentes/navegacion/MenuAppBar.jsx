import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link } from 'react-router-dom';

const MenuAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, href: '/' },
    { text: 'About', icon: <InfoIcon />, href: '/about' },
    { text: 'Contact', icon: <ContactMailIcon />, href: '/contact' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Botón del menú */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Logo e ícono */}
          <Box display="flex" alignItems="center">
            <IconButton edge="start" aria-label="store" color="inherit">
              <StorefrontIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
              GERMANSTORE
            </Typography>
          </Box>

          {/* Botón de login */}
          <Button color="inherit" href="/Login" sx={{ fontWeight: 'bold' }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component="a" href={item.href}>
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




