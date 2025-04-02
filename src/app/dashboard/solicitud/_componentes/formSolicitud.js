import {
  Box,
  Card,
  Container,
  Divider,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Send, Clear } from "@mui/icons-material";

const formSolicitud = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    aceptaTerminos: false,
    genero: "",
    pais: "",
  });

  const [errores, setErrores] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre) nuevosErrores.nombre = "Nombre es requerido";
    if (!formData.email) {
      nuevosErrores.email = "Email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nuevosErrores.email = "Email no válido";
    }
    if (!formData.password) nuevosErrores.password = "Contraseña es requerida";
    if (!formData.aceptaTerminos)
      nuevosErrores.aceptaTerminos = "Debes aceptar los términos";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      console.log("Formulario enviado:", formData);
      // Aquí iría tu llamada a la API
      setSubmitSuccess(true);
    }
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      email: "",
      password: "",
      telefono: "",
      aceptaTerminos: false,
      genero: "",
      pais: "",
    });
    setErrores({});
    setSubmitSuccess(false);
  };
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Formulario de Registro
        </Typography>


      <Divider />




        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Formulario enviado con éxito!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Nombre completo"
                name="nombre"
                variant="standard"
                value={formData.nombre}
                onChange={handleChange}
                error={!!errores.nombre}
                helperText={errores.nombre}
                margin="normal"
                required
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Cod. Intermediario"
                name="password"
                type="password"
                variant="standard"
                value={formData.password}
                onChange={handleChange}
                error={!!errores.password}
                helperText={errores.password}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                type="email"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                error={!!errores.email}
                helperText={errores.email}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="pais-label">País</InputLabel>
                <Select
                  labelId="pais-label"
                  name="pais"
                  variant="standard"
                  value={formData.pais}
                  placeholder="País"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  <MenuItem value="mx">México</MenuItem>
                  <MenuItem value="co">Colombia</MenuItem>
                  <MenuItem value="ar">Argentina</MenuItem>
                  <MenuItem value="es">España</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
            >

             <Divider />
              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleReset}
              >
                Limpiar
              </Button>
              <Button type="submit" variant="contained" startIcon={<Send />}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default formSolicitud;
