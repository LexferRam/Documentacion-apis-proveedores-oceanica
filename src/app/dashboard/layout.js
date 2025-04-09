"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AppBar, CssBaseline, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icono para cerrar sesión

function useSessionStorage(key) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const item = sessionStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    }
  }, [key]);

  return value;
}

export default function AnchorTemporaryDrawer({ children }) {
  const activeSegment = useSelectedLayoutSegment();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const profile = useSessionStorage("PROFILE_KEY");
  const codigoPerfil = profile?.PROFILE_CODE;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      // Si tienes tu propio sistema de autenticación:
      // await fetch('/api/logout', { method: 'POST' });
      // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      sessionStorage.removeItem("PROFILE_KEY");

      window.location.href = "/documentacion_api";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <List>
          <Link href="/dashboard/solicitud">
            <ListItemButton selected={activeSegment === "solicitud"}>
              <ListItemText primary="Solicitudes" />
            </ListItemButton>
          </Link>

          <Link href="/dashboard/documentacion">
            <ListItemButton selected={activeSegment === "documentacion"}>
              <ListItemText primary="Documentación API" />
            </ListItemButton>
          </Link>
        </List>

        {/* Menú condicional basado en el perfil */}
        {codigoPerfil === "insurance_broker" ? (
          <Link href="/dashboard/contactanos">
            <ListItemButton selected={activeSegment === "contactanos"}>
              <ListItemText primary="Contáctanos" />
            </ListItemButton>
          </Link>
        ) : (
          <></>
        )}

        <Divider />
        {/* Opción de cerrar sesión en el drawer (opcional) */}
        <ListItemButton onClick={handleLogout}>
          <ExitToAppIcon sx={{ mr: 1 }} />
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 0, mt: 4 }}
      >
        <Toolbar />
        <CssBaseline />
        <AppBar color="default" position="fixed" open={state["left"]}>
          <Toolbar sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              // aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image
                src="https://oceanicadeseguros.com/static/oceanica_original-1035af5b673858a792c437cf229007bd.png"
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
