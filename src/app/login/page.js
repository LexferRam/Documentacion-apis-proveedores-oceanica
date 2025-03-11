"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Lock } from "@mui/icons-material"; // Iconos de Material-UI
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";


const page = () => {
  const [p_portal_username, setP_portal_username] = useState("");
  const [p_pwd, setP_pwd] = useState("");
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("valor 1", p_portal_username);
    console.log("valor 2", p_pwd);
    // Llamada a NextAuth.js para autenticar
    const result = await signIn("credentials", {
      redirect: false,
      p_portal_username,
      p_pwd,
      // redirectTo:'/dashboard',
    });

    console.log("ver valor provider ", result);

    if (result.error) {
      alert(result.error); // Muestra un mensaje de error si la autenticación falla
    } else {
      alert("entroo");
      window.location.href = "/dashboard"; // Redirige al usuario a la página principal
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
                  type="password"
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
