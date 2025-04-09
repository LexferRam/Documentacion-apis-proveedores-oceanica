"use client";
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
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Send, Clear } from "@mui/icons-material";
import Axios from "axios";
import { useLoadingProvider } from "@/context/LoadingContext";
import { IMaskInput } from 'react-imask'; // Import IMaskInput

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  return (
    <IMaskInput
      {...props}
      inputRef={ref} // Use inputRef instead of ref for IMaskInput
      mask={[
        { mask: '0000-0000000' },
        { mask: '0000-0000000' }, // Added another mask for the second format
      ]}
    />
  );
});

function useSessionStorage(key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = sessionStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    }
  }, [key]);

  return value;
}

const FormSolicitud = ({ show, setShow, constDataHistorico }) => {
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
  const [listaValores, setListaValores] = useState([]); // Cambiado a array vacío

  const { setLoading } = useLoadingProvider();
  const profile = useSessionStorage("PROFILE_KEY");
  const codigoAsesor = profile?.p_insurance_broker_code;

  const constListaApi = async () => {
    try {
      const params = {
        p_cia: 2,
      };

      const response = await Axios.post(
        "https://oceanicadeseguros.com/asg-api/dbo/doc_api/sp_api", params);

      // Asegurarse que siempre sea un array
      const datos = Array.isArray(response.data?.c_detalle_api)
        ? response.data.c_detalle_api
        : [];

      setListaValores(datos);

    } catch (error) {
      console.error("Error fetching data:", error);
      setListaValores([]); // En caso de error, establecer array vacío
    }
  };

  useEffect(() => {
    if (codigoAsesor !== undefined) {
      constListaApi();
    }
  }, [codigoAsesor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductosChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      productosSeleccionados:
        typeof value === "string" ? value.split(",") : value,
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
    // if (formData.telefono && !/^(0-\d{7}|04\d{2}-\d{7})$/.test(formData.telefono)) {
    //   nuevosErrores.telefono = "Teléfono no válido. Formato: 0212-XXXXXXX o 04XX-XXXXXXX";
    // }
    if (formData.productosSeleccionados.length === 0) {
      nuevosErrores.productosSeleccionados = "Seleccione al menos un producto";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    if (!validarFormulario()) {
      setLoading(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const datosEnvio = {
        p_cia: 2,
        p_codinter: codigoAsesor,
        p_estatus: "P",
        p_contacto: formData.nombre,
        p_email: formData.email,
        p_telf_contacto: formData.telefono,
        arr_apis: formData.productosSeleccionados.join("|"),
      };

      const response = await Axios.post(
        "https://oceanicadeseguros.com/asg-api/dbo/doc_api/sp_crear_solicitud_Asesor",
        datosEnvio
      );

      setSubmitSuccess(true);
      await constDataHistorico();
      setShow(false);

      setFormData({
        nombre: "",
        email: "",
        codigoIntermediario: "",
        telefono: "",
        productosSeleccionados: [],
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setApiError(
        "Ocurrió un error al enviar el formulario. Por favor intente nuevamente."
      );
    } finally {
      setLoading(false);
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        py: 4,
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "black",
              mb: 2,
              fontFamily: "system-ui",
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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
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
                InputProps={{
                  inputComponent: TextMaskCustom,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                margin="normal"
                error={!!errores.productosSeleccionados}
              >
                <InputLabel id="productos-label">Productos *</InputLabel>
                <Select
                  labelId="productos-label"
                  id="productos-select"
                  multiple
                  value={formData.productosSeleccionados}
                  onChange={handleProductosChange}
                  input={<OutlinedInput label="Productos *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((codigo) => {
                        const producto = listaValores.find(
                          (p) => p.CODIGO_API === codigo
                        );
                        return (
                          <Chip
                            key={codigo}
                            label={producto ? producto.NOMBRE : codigo}
                            sx={{
                              backgroundColor:
                                producto?.PRODUCTO === "SALUD"
                                  ? "#e3f2fd"
                                  : "#fff8e1",
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
                  {listaValores.length > 0 ? (
                    listaValores.map((producto) => (
                      <MenuItem
                        key={producto.CODIGO_API}
                        value={producto.CODIGO_API}
                        sx={{
                          fontWeight: formData.productosSeleccionados.includes(
                            producto.CODIGO_API
                          )
                            ? "bold"
                            : "normal",
                          backgroundColor:
                            formData.productosSeleccionados.includes(
                              producto.CODIGO_API
                            )
                              ? producto.PRODUCTO === "SALUD"
                                ? "#bbdefb"
                                : "#ffe0b2"
                              : "inherit",
                        }}
                      >
                        {producto.NOMBRE} ({producto.PRODUCTO})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay productos disponibles</MenuItem>
                  )}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 0.5,
                  mt: 2,
                  mb: 1,
                }}
              >
                <Button
                  variant="outlined"
                  size="medium"
                  color="error"
                  startIcon={<Clear />}
                  onClick={handleReset}
                  sx={{
                    px: 2,
                    py: 0.8,
                  }}
                >
                  Regresar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="error"
                  startIcon={<Send />}
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#47c0b6",
                    "&:hover": {
                      backgroundColor: "#3aa99e",
                    },
                  }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
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