import React, { useState, useEffect } from 'react';
import {
  Avatar, Button, Menu, MenuItem,
  ListItemIcon, ListItemText, Typography, Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { useStateValue } from '../../../contexto/store.jsx';

const MenuCliente = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const { isAuthenticated, usuario } = sesionUsuario;
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 [MenuCliente] isAuthenticated=', isAuthenticated, ' usuario=', usuario);
  }, [isAuthenticated, usuario]);

  if (!isAuthenticated) return null; // o un pequeño placeholder

  const handleOpenMenu = e => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    handleCloseMenu();
    navigate('/login');
  };

  const nombre = usuario?.username ?? 'Usuario';
  const foto   = usuario?.imagenPerfil || usuario?.imagen || '';

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
      >
        <Avatar src={foto} alt={nombre} sx={{ width: 32, height: 32, mr: 1 }}>
          {nombre?.[0] ?? '❓'}
        </Avatar>
        <Typography variant="body1" sx={{ mr: 0.5 }}>{nombre}</Typography>
        <KeyboardArrowDownIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top',    horizontal: 'right' }}
      >
        <MenuItem component={Link} to="/misPedidos" onClick={handleCloseMenu}>
          <ListItemIcon><ShoppingCartIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Mis Pedidos" />
        </MenuItem>
        <MenuItem component={Link} to="/perfil" onClick={handleCloseMenu}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Perfil" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuCliente;
