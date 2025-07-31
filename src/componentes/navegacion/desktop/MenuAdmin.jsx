import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// Íconos de Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MenuAdmin = ({ usuario: propUsuario, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const currentUser = propUsuario;

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('Cerrando sesión del administrador (lógica por defecto)...');
      localStorage.removeItem('token');
      navigate('/login');
    }
    handleCloseMenu();
  };

  const nombre = currentUser?.username || currentUser?.nombre || 'Administrador';
  const foto = currentUser?.imagenPerfil || currentUser?.imagen || '';

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
      >
        <Avatar
          src={foto}
          alt={nombre}
          sx={{ width: 32, height: 32, marginRight: 1 }}
        >
          {nombre?.[0] || '❓'}
        </Avatar>
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          {nombre}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* ¡¡¡IMPORTANTE!!! Eliminar la prop 'button' de MenuItem si estaba presente */}
        <MenuItem
          component={Link}
          to="/admin/dashboard"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/listaProductos"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Gestionar Productos" />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/usuarios"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Gestionar Usuarios" />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/listaPedidos"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lista de Pedidos" />
        </MenuItem>

        {/* Opciones de cliente que un admin también podría necesitar (descomenta si aplica) */}
        {/*
        <MenuItem component={Link} to="/misPedidos" onClick={handleCloseMenu}>
          <ListItemIcon><ShoppingCartIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Mis Pedidos" />
        </MenuItem>
        <MenuItem component={Link} to="/perfil" onClick={handleCloseMenu}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Perfil" />
        </MenuItem>
        */}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAdmin;
