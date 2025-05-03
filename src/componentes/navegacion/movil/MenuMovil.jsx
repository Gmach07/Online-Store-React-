import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MenuMovil = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    return (
        <>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Cerrar Sesión" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default MenuMovil;