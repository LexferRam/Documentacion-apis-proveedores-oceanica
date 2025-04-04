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
  Divider,
  useTheme
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { login } from "./auth";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoadingProvider } from "@/context/LoadingContext";

const page = () => {
  const [p_portal_username, setP_portal_username] = useState("");
  const [p_pwd, setP_pwd] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLoading } = useLoadingProvider();
  const theme = useTheme();
    
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(p_portal_username, p_pwd);
    if (result.status === 400) {
      alert("falla autenticacion");
    } else {
      setLoading(false);
      sessionStorage.setItem("PROFILE_KEY", JSON.stringify(result.user));
      window.location.href = "/dashboard/solicitud";
    }
  };

  return (
    <Container component="main" maxWidth="sm"> {/* Cambiado a maxWidth="sm" para más ancho */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          py: 4
        }}
      >
        <Card elevation={6} sx={{ 
          width: "100%", 
          maxWidth: 450,  // Ancho personalizado
          px:4 ,
          py:0, 
          borderRadius: 3,
          boxShadow: theme.shadows[4]
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Logo más grande y optimizado */}
              <Box sx={{ 
                width: 200,  // Tamaño aumentado
                height: 140,
                position: 'relative',
                // mb: 2
              }}>
                <Image
                  src="https://oceanicadeseguros.com/static/oceanica_original-1035af5b673858a792c437cf229007bd.png"
                  alt="Logo de la empresa"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
              
              <Typography variant="h5" component="h1" sx={{ 
                fontWeight: 600,
                color: '#233748',
                mb: 1,
                fontFamily: 'system-ui'
              }}>
                Sistema gestión de APIS
              </Typography>
              
              <Divider sx={{ 
                width: '80%', 
                borderColor: theme.palette.divider,
                borderBottomWidth: 2
              }} />
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                value={p_portal_username}
                onChange={(e) => setP_portal_username(e.target.value)}
                margin="normal"
                label="Usuario"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={p_pwd}
                onChange={(e) => setP_pwd(e.target.value)}
                margin="normal"
                label="Contraseña"
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
                        size="small"
                      >
                        {showPassword ? 
                          <VisibilityOff fontSize="small" /> : 
                          <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 400,
                  textTransform: 'capitalize',
                  backgroundColor: '#47c0b6',
                  '&:hover': {
                    backgroundColor: '#3aa99e',
                    boxShadow: theme.shadows[2]
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Iniciar sesión
              </Button>
              
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Grid item>
                  <Link
                    href="https://asesores.segurospiramide.com/register"
                    variant="body2"
                    color="text.secondary"
                    underline="hover"
                    sx={{
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
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
  );
};

export default page;