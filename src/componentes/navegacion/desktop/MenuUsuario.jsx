// src/components/navegacion/desktop/MenuUsuario.jsx

import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect
import {
  Avatar, Button, Menu, MenuItem,
  ListItemIcon, ListItemText, Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// Íconos (sin cambios)
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useStateValue } from '../../../contexto/store';

const MenuUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const { usuario } = sesionUsuario;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // --- INICIO DE LA DEPURACIÓN ---
  // Este useEffect se ejecutará cada vez que el objeto 'usuario' cambie.
  useEffect(() => {
    console.log('🕵️‍♂️ [MenuUsuario] Verificando datos de usuario:', usuario);
  }, [usuario]);
  // --- FIN DE LA DEPURACIÓN ---

  // La lógica para determinar si es admin se mantiene
  const isAdmin = usuario?.roles?.includes('admin');

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    handleCloseMenu();
    navigate('/login');
  };

  const menuItemsAdmin = [
    { text: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { text: 'Productos', path: '/admin/listaProductos', icon: <StorefrontIcon fontSize="small" /> },
    { text: 'Usuarios', path: '/admin/usuarios', icon: <GroupIcon fontSize="small" /> },
    { text: 'Pedidos', path: '/admin/listaPedidos', icon: <ReceiptIcon fontSize="small" /> },
  ];

  const menuItemsCliente = [
    { text: 'Mis Pedidos', path: '/misPedidos', icon: <ShoppingCartIcon fontSize="small" /> },
    { text: 'Mi Perfil', path: '/perfil', icon: <PersonIcon fontSize="small" /> },
  ];

  const itemsAMostrar = isAdmin ? menuItemsAdmin : menuItemsCliente;

  const nombreUsuario = usuario?.username || 'Usuario';
  const fotoPerfil = usuario?.imagen || '';

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none', ml: 1 }}
      >
        <Avatar src={fotoPerfil} alt={nombreUsuario} sx={{ width: 32, height: 32, mr: 1 }}>
          {nombreUsuario?.[0].toUpperCase()}
        </Avatar>
        <Typography variant="body1" sx={{ mr: 0.5 }}>{nombreUsuario}</Typography>
        <KeyboardArrowDownIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {itemsAMostrar.map((item) => (
          <MenuItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleCloseMenu}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuUsuario;

