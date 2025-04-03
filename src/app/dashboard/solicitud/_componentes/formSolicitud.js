'use client'
import {
  Box,
  Card,
  Container,
  Divider,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Alert,
  useTheme,
  Chip,
  OutlinedInput
} from "@mui/material";
import React, { useState } from "react";
import { Send, Clear } from "@mui/icons-material";
import Axios from "axios";

const listaValores = {
  "c_detalle_api": [
    {
      "CODIGO_API": "EMER",
      "NOMBRE": "EMERGENCIAS",
      "PRODUCTO": "SALUD"
    },
    {
      "CODIGO_API": "FUNE",
      "NOMBRE": "FUNERARIO",
      "PRODUCTO": "SALUD"
    },
    {
      "CODIGO_API": "ACCI",
      "NOMBRE": "ACCIDENTE PERSONAL",
      "PRODUCTO": "SALUD"
    },
    {
      "CODIGO_API": "RCV",
      "NOMBRE": "RESPONSABILIDAD CIVIL",
      "PRODUCTO": "AUTO"
    },
    {
      "CODIGO_API": "VIDA",
      "NOMBRE": "VIDA",
      "PRODUCTO": "SALUD"
    }
  ]
};

const FormSolicitud = ({ show, setShow }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    codigoIntermediario: "",
    telefono: "",
    productosSeleccionados: [],
  });

  const [errores, setErrores] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductosChange = (event) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      productosSeleccionados: typeof value === 'string' ? value.split(',') : value,
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
    if (!formData.codigoIntermediario) nuevosErrores.codigoIntermediario = "Código Intermediario es requerido";
    if (formData.telefono && !/^[0-9]{7,15}$/.test(formData.telefono)) {
      nuevosErrores.telefono = "Teléfono no válido";
    }
    if (formData.productosSeleccionados.length === 0) {
      nuevosErrores.productosSeleccionados = "Seleccione al menos un producto";
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validarFormulario()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const datosEnvio = {
        p_cia: 1,
        p_codinter: formData.codigoIntermediario,
        p_estatus: "P",
        p_contacto: formData.nombre,
        p_email: formData.email,
        p_telf_contacto: formData.telefono,
        arr_apis: formData.productosSeleccionados.join("|")
      };

      console.log("Datos a enviar a la API:", datosEnvio);



      const response = await Axios.post(
        "https://segurospiramide.com/asg-api/dbo/doc_api/sp_crear_solicitud_Asesor",
        datosEnvio
      );
   
        console.log('ver respuesta ', response.data)
      
      // Simulación de envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        nombre: "",
        email: "",
        codigoIntermediario: "",
        telefono: "",
        productosSeleccionados: [],
      });

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setApiError("Ocurrió un error al enviar el formulario. Por favor intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShow(false);
  };

  return (
    <Container 
      component="main" 
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        py: 4
      }}
    >
      <Card 
        elevation={6} 
        sx={{ 
          width: '100%', 
          maxWidth: 800,
          p: 4,
          borderRadius: 2,
          backgroundColor: '#ffffff'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              mb: 2
            }}
          >
            Gestión de Solicitudes
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Formulario enviado con éxito!
          </Alert>
        )}

        {apiError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {apiError}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate
          sx={{ mt: 2 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre completo"
                name="nombre"
                variant="outlined"
                value={formData.nombre}
                onChange={handleChange}
                error={!!errores.nombre}
                helperText={errores.nombre}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código Intermediario"
                name="codigoIntermediario"
                variant="outlined"
                value={formData.codigoIntermediario}
                onChange={handleChange}
                error={!!errores.codigoIntermediario}
                helperText={errores.codigoIntermediario}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errores.email}
                helperText={errores.email}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                variant="outlined"
                value={formData.telefono}
                onChange={handleChange}
                error={!!errores.telefono}
                helperText={errores.telefono}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" error={!!errores.productosSeleccionados}>
                <InputLabel id="productos-label">Productos *</InputLabel>
                <Select
                  labelId="productos-label"
                  id="productos-select"
                  multiple
                  value={formData.productosSeleccionados}
                  onChange={handleProductosChange}
                  input={<OutlinedInput label="Productos *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((codigo) => {
                        const producto = listaValores.c_detalle_api.find(p => p.CODIGO_API === codigo);
                        return (
                          <Chip 
                            key={codigo}
                            label={producto ? producto.NOMBRE : codigo}
                            sx={{
                              backgroundColor: producto?.PRODUCTO === 'SALUD' ? '#e3f2fd' : '#fff8e1'
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224,
                        width: 250,
                      },
                    },
                  }}
                >
                  {listaValores.c_detalle_api.map((producto) => (
                    <MenuItem 
                      key={producto.CODIGO_API} 
                      value={producto.CODIGO_API}
                      sx={{
                        fontWeight: formData.productosSeleccionados.includes(producto.CODIGO_API) 
                          ? 'bold' 
                          : 'normal',
                        backgroundColor: formData.productosSeleccionados.includes(producto.CODIGO_API)
                          ? producto.PRODUCTO === 'SALUD' ? '#bbdefb' : '#ffe0b2'
                          : 'inherit'
                      }}
                    >
                      {producto.NOMBRE} ({producto.PRODUCTO})
                    </MenuItem>
                  ))}
                </Select>
                {errores.productosSeleccionados && (
                  <Typography variant="caption" color="error" sx={{ ml: 1.5 }}>
                    {errores.productosSeleccionados}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 0.5,  // Espacio mínimo entre botones
                mt: 2,     // Margen superior reducido
                mb: 1      // Margen inferior reducido
              }}>
                <Button
                  variant="outlined"
                  size="medium"
                  color="error"
                  startIcon={<Clear />}
                  onClick={handleReset}
                  sx={{ 
                    px: 2,  // Padding horizontal reducido
                    py: 0.8 // Padding vertical reducido
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="medium"
                  color="error"
                  startIcon={<Send />}
                  disabled={isSubmitting}
                  sx={{ 
                    px: 2,
                    py: 0.8
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default FormSolicitud;