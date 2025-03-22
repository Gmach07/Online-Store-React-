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
import { Link } from 'react-router-dom';

// Íconos de Material UI (ajusta según tus necesidades)
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuAdmin = ({ usuario }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Aquí iría tu lógica de cierre de sesión
    // Ejemplo: limpiar tokens, llamar a un endpoint, etc.
    console.log('Cerrando sesión...');
    handleCloseMenu();
  };

  return (
    <>
      {/* Botón que muestra Avatar + Nombre y abre el menú */}
      <Button
        color="inherit"
        onClick={handleOpenMenu}
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }}
      >
        <Avatar
          src={usuario?.imagenPerfil}
          alt="Avatar"
          sx={{ width: 32, height: 32, marginRight: 1 }}
        />
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          {usuario?.nombre || 'Admin'}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>

      {/* Menú desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Ejemplo de opción: Dashboard */}
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

        {/* Ejemplo de opción: Administrar Productos */}
        <MenuItem
          component={Link}
          to="/admin/productos"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={''} primary="Productos" />
        </MenuItem>

        {/* Ejemplo de opción: Administrar Usuarios */}
        <MenuItem
          component={Link}
          to="/admin/usuarios"
          onClick={handleCloseMenu}
        >
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </MenuItem>

        {/* Opción: Cerrar Sesión */}
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
