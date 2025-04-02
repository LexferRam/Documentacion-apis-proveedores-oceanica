'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, CssBaseline, IconButton, Toolbar } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function AnchorTemporaryDrawer({ children }) {
  const activeSegment = useSelectedLayoutSegment()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <List>
          <Link href="/dashboard/solicitud">
            <ListItemButton selected={activeSegment === 'solicitud'}>
              <ListItemText primary="Solicitudes" />
            </ListItemButton>
          </Link>

          <Link href="/dashboard/documentacion">
            <ListItemButton selected={activeSegment === 'documentacion'}>
              <ListItemText primary="Documentación API" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0, mt: 4 }}
      >
        <Toolbar />
        <CssBaseline />
        <AppBar color="default" position="fixed" open={state['left']}>
          <Toolbar sx={{ display: 'flex' }}>
            <IconButton
              color="inherit"
              // aria-label="open drawer"
              onClick={toggleDrawer('left', true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Image
                src="https://asesores.segurospiramide.com/static/logo-piramides-d07524ef35db8b8403dff1b54884e9aa.svg"
                alt="Logo de la empresa"
                width={150}
                height={50}
                className="image-logo"
              />
            </div>
          </Toolbar>
        </AppBar>

        {children}

      </Box>
    </>
  );
}