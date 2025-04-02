"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import FormSolicitud from "./_componentes/formSolicitud";
import Axios from "axios";

export const listaValor = {
  c_detalle_api: [
    {
      NOMBRE: "Aprobado",
      PRODUCTO: "A",
    },
    {
      NOMBRE: "Rechazado",
      PRODUCTO: "R",
    },
  ],
};

const Page = () => {
  const [show, setShow] = useState(false);
  const [dataHistorico, setDataHistorico] = useState({
    c_solicitud: [],
    c_det_solicitud: [],
  });
  const [selectedValues, setSelectedValues] = useState({});
  const [changes, setChanges] = useState([]);

  const handleOnClick = () => {
    setShow(true);
  };

  //   useEffect(() => {
  //  console.log('ver' , selectedValues)
  //  console.log('ver 2' , changes)

  //   }, [selectedValues,changes])

  const handleSelectChange = (event, rowId) => {
    const [masterId, productName, codApi] = rowId.split("_");
    const newValue = event.target.value;

    setSelectedValues((prev) => ({
      ...prev,
      [rowId]: newValue,
    }));

    setChanges((prev) => {
      const existingChangeIndex = prev.findIndex(
        (change) =>
          change.ID_SOLICITUD === masterId && change.NOMBRE === productName
      );

      if (existingChangeIndex >= 0) {
        const updatedChanges = [...prev];
        updatedChanges[existingChangeIndex].ESTATUS =
          newValue === "Aprobado" ? "A" : "R";
        return updatedChanges;
      } else {
        return [
          ...prev,
          {
            ID_SOLICITUD: masterId,
            NOMBRE: productName,
            ESTATUS: newValue === "Aprobado" ? "A" : "R",
            URL:
              event.target.value === "Aprobado"
                ? "URL_APROBADO"
                : "URL_RECHAZADO",
           CODIGO_API: codApi
          },
        ];
      }
    });
  };

  const handleUpdateClick = async (masterData) => {
    try {
      const detallesActualizados = changes.filter(
        (change) =>
          change.ID_SOLICITUD.toString() === masterData.ID_SOLICITUD.toString()
      );
         console.log('valor 1 ', detallesActualizados)

      if (detallesActualizados.length === 0) {
        alert("No hay cambios para actualizar en esta solicitud");
        return;
      }

      // Transformación al formato requerido por la API
      const apiPayload = {
        p_cia: 1,
        p_id_solicitud: masterData.ID_SOLICITUD,
        p_estatus: "A",
        arr_apis: detallesActualizados.map((d) => d.CODIGO_API).join("|"),
        arr_apis_sts: detallesActualizados.map((d) => d.ESTATUS).join("|"),
      };

      // Ejemplo de llamada a la API (descomenta cuando tengas el endpoint)
      
      const response = await Axios.post('https://segurospiramide.com/asg-api/dbo/doc_api/sp_Actualizar_solicitud', 
        apiPayload
      );
  
      if (response.status === 200) {
        setDataHistorico({
          c_solicitud: [],
          c_det_solicitud: [],
        })
        constDataHistorico(); // Refrescar datos
        setChanges(prev => prev.filter(change => change.ID_SOLICITUD !== masterData.ID_SOLICITUD));
      } else {
        throw new Error(response.data.message);
      }
      alert(
        `Solicitud ${masterData.ID_SOLICITUD} actualizada con ${detallesActualizados.length} cambios`
      );
      console.log("Payload que se enviaría:", apiPayload);
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert(`Error al actualizar: ${error.message}`);
    }
  };

  const constDataHistorico = async () => {
    alert('entroo a funcion ')
    try {
      const params = {
        p_cia: 1,
        p_codinter: "0",
      };
      const response = await Axios.post(
        "https://segurospiramide.com/asg-api/dbo/doc_api/sp_consulta_solicitudes",
        params
      );
      setDataHistorico(
        response.data || {
          c_solicitud: [],
          c_det_solicitud: [],
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataHistorico({
        c_solicitud: [],
        c_det_solicitud: [],
      });
    }
  };

  useEffect(() => {
    constDataHistorico();
  }, []);

  const transformedData = useMemo(
    () =>
      dataHistorico.c_solicitud?.map((solicitud) => ({
        ...solicitud,
        FECHA: new Date(solicitud.FECHA).toLocaleDateString(),
        detalles: dataHistorico.c_det_solicitud.filter(
          (det) => det.ID_SOLICITUD === solicitud.ID_SOLICITUD
        ),
      })),
    [dataHistorico]
  );

  const detailColumns = useMemo(
    () => [
      {
        accessorKey: "NOMBRE",
        header: "Producto",
        size: 200,
      },
      {
        accessorKey: "CODIGO_API",
        header: "codigo Producto",
        size: 200,
      },
      {
        accessorKey: "ESTATUS",
        header: "Estatus",
        size: 100,
        Cell: ({ cell }) => (
          <span
            style={{
              color: cell.getValue() === "A" ? "green" : cell.getValue() === "P" ? "orange" : "red",
              fontWeight: "bold",
            }}
          >
            {cell.getValue() === "A" ? "Aprobado" :cell.getValue() === "P" ? "Pendiente": "Rechazado"}
          </span>
        ),
      },
      {
        accessorKey: "URL",
        header: "URL",
        size: 300,
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
            {cell.getValue()}
          </a>
        ),
      },
      {
        header: "Acción",
        size: 120,
        Cell: ({ row }) => {
          const rowId = `${row.original.ID_SOLICITUD}_${row.original.NOMBRE}_${row.original.CODIGO_API}`;

          return (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`select-label-${rowId}`}>Estatus</InputLabel>
              <Select
                labelId={`select-label-${rowId}`}
                id={`select-${rowId}`}
                value={selectedValues[rowId] || ""}
                onChange={(e) => handleSelectChange(e, rowId)}
              >
                <MenuItem value="">
                  <em>Seleccionar</em>
                </MenuItem>
                {listaValor.c_detalle_api.map((item, index) => (
                  <MenuItem key={index} value={item.NOMBRE}>
                    {item.NOMBRE}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        },
      },
    ],
    [selectedValues]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "FECHA",
        header: "Fecha",
        size: 120,
      },
      {
        accessorKey: "CONTACTO",
        header: "Contacto",
        size: 180,
      },
      {
        accessorKey: "EMAIL",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "TELF_CONTACTO",
        header: "Teléfono",
        size: 120,
      },
      {
        accessorKey: "ESTATUS",
        header: "Estatus",
        size: 100,
        Cell: ({ cell }) => (
          <span
            style={{
              color: cell.getValue() === "A" ? "green" : cell.getValue() === "P" ? "orange" : "red",
              fontWeight: "bold",
            }}
          >
            {cell.getValue() === "A" ? "Aprobado" : cell.getValue() === "P" ? "Pendiente" :"Rechazado"}
          </span>
        ),
      },
      {
        header: "Acción",
        size: 80,
        Cell: ({ row }) => {
          const hasChanges = changes.some(change => change.ID_SOLICITUD.toString() === row.original.ID_SOLICITUD.toString());
          return (
            <Tooltip title={hasChanges ? "Actualizar cambios" : "No hay cambios para actualizar"}>
              <Button
                size="small"
                variant="contained"
                color={"inherit"}
                onClick={() => handleUpdateClick(row.original)}
                disabled={!hasChanges}
                sx={{
                  backgroundColor: hasChanges ? '#eb4215' : '#e0e0e0',
                  color: hasChanges ? 'white' : '#9e9e9e',
                  '&:hover': {
                    backgroundColor: hasChanges ? '#c2330e' : '#e0e0e0',
                  }
                }}
              >
                Actualizar
              </Button>
            </Tooltip>
          );
        },
      },
    ],
    [changes]
  );

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
    localization: MRT_Localization_ES,
    enableExpandAll: true,
    enableExpanding: true,
    filterFromLeafRows: true,
    initialState: { expanded: false },
    paginateExpandedRows: true,
    muiTableHeadCellProps: {
      sx: {
        background: "#eb4215",
        color: "white",
        fontWeight: "bold",
        fontSize: "0.9rem",
      },
    },
    renderDetailPanel: ({ row }) => {
      const detalles = row.original.detalles || [];

      return (
        <Box sx={{ padding: "16px", width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                {detailColumns.map((column) => (
                  <th
                    key={column.accessorKey || column.header}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle, index) => (
                <tr key={index}>
                  {detailColumns.map((column) => (
                    <td
                      key={column.accessorKey || column.header}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {column.Cell ? (
                        <column.Cell
                          cell={{ getValue: () => detalle[column.accessorKey] }}
                          row={{ original: detalle }}
                        />
                      ) : (
                        detalle[column.accessorKey]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      );
    },
  });

  return (
    <>
      {!show ? (
        <Container component="main" maxWidth="lg">
          <Card
            elevation={6}
            sx={{ width: "100%", padding: 3, marginBottom: 3 }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">Solicitudes</Typography>
            </Box>
            <Divider />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                  onClick={handleOnClick}
                >
                  Solicitar
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ p: 2 }}>
              <MaterialReactTable table={table} />
            </Box>
          </Card>
        </Container>
      ) : (
        <FormSolicitud />
      )}
    </>
  );
};

export default Page;
