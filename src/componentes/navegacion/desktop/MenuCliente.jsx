// src/components/MenuCliente.jsx

import React, { useState, useContext } from 'react';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SessionContext } from '../context/SessionContext';
import { logoutUsuario } from '../actions/UsuarioActions';

const MenuCliente = () => {
  const { state, dispatch } = useContext(SessionContext);
  const { usuario, isAuthenticated } = state.sesionUsuario;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Ejecuta acción de logout
    logoutUsuario(dispatch);
    handleCloseMenu();
    // Redirige al login o home
    navigate('/login');
  };

  // Si no está autenticado, no mostramos el menú
  if (!isAuthenticated) return null;

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
      >
        <Avatar
          src={usuario.imagen || usuario.imagenPerfil}
          alt={usuario.nombre}
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        <Typography variant="body1" sx={{ mr: 0.5 }}>
          {usuario.nombre}
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
        <MenuItem
          component={Link}
          to="/misPedidos"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mis Pedidos" />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/perfil"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </MenuItem>

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

export default MenuCliente;
