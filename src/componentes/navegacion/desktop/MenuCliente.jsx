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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuCliente = ({ usuario }) => {
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
          {usuario?.nombre || 'Invitado'}
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
        {/* Opción: Mis Pedidos */}
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

        {/* Opción: Perfil */}
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

export default MenuCliente;
