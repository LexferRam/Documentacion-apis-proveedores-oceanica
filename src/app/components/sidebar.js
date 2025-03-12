'use client'; // Marca el componente como del lado del cliente

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(true); // El menú está abierto por defecto

  const toggleDrawer = () => {
    setOpen(!open); // Alterna el estado del menú
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            position: 'fixed',
            height: '100vh',
            zIndex: 999,
            top: "85px"
          },
        }}
        variant={open ? "persistent" : "temporary"} // Dependiendo del estado, cambia entre "persistent" y "temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer} // Cierra el Drawer si el usuario hace clic fuera
      >
        <List>
          <ListItem style={{cursor:"pointer"}} button>
            <ListItemText primary="Solicitudes" />
          </ListItem>
          <ListItem style={{cursor:"pointer"}} button>
            <ListItemText primary="Documentación API" />
          </ListItem>
        </List>
        <Divider />
        {/* Puedes agregar más ítems en el menú */}
      </Drawer>
    </>
  );
};

export default Sidebar;
