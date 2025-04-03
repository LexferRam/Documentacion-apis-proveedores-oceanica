"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material";
import { Lock } from "@mui/icons-material"; // Iconos de Material-UI
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { login } from "./auth";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const page = () => {
  const [p_portal_username, setP_portal_username] = useState("");
  const [p_pwd, setP_pwd] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Llamada a NextAuth.js para autenticar
    const result = await login(p_portal_username, p_pwd);
    if (result.status === 400) {
      alert("falla autenticacion"); // Muestra un mensaje de error si la autenticación falla
    } else {
      sessionStorage.setItem("PROFILE_KEY", JSON.stringify(result.user));
      window.location.href = "/dashboard/solicitud"; // Redirige al usuario a la página principal
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            elevation={6}
            sx={{ width: "100%", padding: 3, marginBottom: 3 }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                  marginTop: -7,
                }}
              >
                <Image
                  src="https://asesores.segurospiramide.com/static/logo-piramides-d07524ef35db8b8403dff1b54884e9aa.svg" // Ruta del logo (guárdalo en la carpeta public)
                  alt="Logo de la empresa"
                  width={200}
                  height={200}
                />
              </Box>

              <Box
                component="form"
                sx={{ marginTop: -7 }}
                onSubmit={handleSubmit}
              >
                {/* Campo de email con icono */}
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  value={p_portal_username}
                  onChange={(e) => setP_portal_username(e.target.value)}
                  margin="normal"
                  placeholder="Usuario"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Campo de contraseña con icono */}
                <TextField
                  fullWidth
                  variant="standard"
                  type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
                  value={p_pwd}
                  onChange={(e) => setP_pwd(e.target.value)}
                  margin="normal"
                  placeholder="Clave"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Botón de inicio de sesión */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </Button>
                {/* Enlace de inicio de sesión */}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="https://asesores.segurospiramide.com/register"
                      variant="body2"
                    >
                      ¿No tienes una cuenta? Regístrate
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default page;
