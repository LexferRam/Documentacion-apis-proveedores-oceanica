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
  Tooltip,
  IconButton,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Axios from "axios"
import { MRT_Localization_ES } from "material-react-table/locales/es";
import AdvisorController from "./_component/AdvisorController";
import { useForm } from "react-hook-form"





const page = () => {
  const defaultValues ={
    p_advisor_selected_0: ''
  }
  const methods = useForm({defaultValues})
  const { handleSubmit, ...objForm } = methods
  const [consultaApi, setConsultaApi] = useState([])
  const index = 0


  const handleBroker = async (value) => {

    const params = {
      p_cia: 1,
      p_codinter: value,
    }
    const response = await Axios.post("https://segurospiramide.com/asg-api/dbo/doc_api/sp_consulta_solicitud_asesor", params)
    setConsultaApi( response.data.c_det_solicitud )
        console.log('VER VALOR DEFINITIVO', response.data.c_det_solicitud )
   
  }


  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "CODIGO_API",
        header: "Còdigo API",
        grow: false,
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
            {cell.getValue() === "A" ? "Aprobado" : cell.getValue() === "P" ? "Pendiente" : "Rechazado"}
          </span>
        ),
      },

      {
        accessorKey: "NOMBRE",
        header: "Nombre del API",
        grow: false,
      },
      {
        accessorKey: "URL",
        header: "URL",
        size: 300,
        Cell: ({ cell }) => (
          <a 
            href={cell.getValue()} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#1976d2', // Color azul de Material-UI
              textDecoration: 'underline', // Opcional: subrayado para indicar que es un enlace
              cursor: 'pointer', // Cambia el cursor al pasar el mouse
            }}
          >
            {cell.getValue()}
          </a>
        ),
      },
      // {
      //   accessorKey: "city",
      //   header: "Accion",
      //   grow: false,
      //   Cell: ({ row }) => {
      //     return (
      //       <>
      //         <Tooltip style={{ zIndex: 999999 }} title="Ver detalles">
      //           <IconButton
      //             sx={{
      //               backgroundColor: "transparent", // Fondo transparente
      //               borderRadius: "50%", // Bordes circulares
      //               padding: "0px", // Espaciado del ícono dentro del botón
      //               "&:hover": {
      //                 backgroundColor: "rgba(255, 255, 255, 0.2)", // Efecto al pasar el ratón
      //               },
      //             }}
      //           >
      //             <AssignmentIcon sx={{ color: "black" }} />
      //           </IconButton>
      //         </Tooltip>
      //       </>
      //     );
      //   },
      // },

      // {
      //   accessorKey: 'state',
      //   enableColumnOrdering: false,
      //   header: 'Estado',
      //   grow: false,
      // },
    ],
    []
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: consultaApi, // Aquí pasas los datos correctamente,
    localization: MRT_Localization_ES,
    // enableExpandAll: true, //hide expand all double arrow in column header
    // enableExpanding: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    // getSubRows: (row) => row.subRows, //default
    initialState: { expanded: false }, //expand all rows by default
    paginateExpandedRows: true, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
    muiTableHeadCellProps: {
      sx: {
        background: "#eb4215",
        color: "white",
        fontWeight: "bold",
        fontSize: "0.9rem",
      },
    }
    // renderDetailPanel: ({ row }) => {
    //   const details = detailData[row.original.id] || [];

    //   return (
    //     <Box sx={{ padding: "16px", width: "100%" }}>
    //       {/* <Typography variant="h6" gutterBottom>
    //         Tareas del Proyecto: {row.original.nombre}
    //       </Typography> */}

    //       <MaterialReactTable
    //         columns={[
    //           { accessorKey: "tarea", header: "Tarea", size: 200 },
    //           { accessorKey: "estado", header: "Estado", size: 100 },
    //           { accessorKey: "fecha", header: "Fecha", size: 120 },
    //         ]}
    //         data={details}
    //         // initialState={{ density: "compact" }}
    //         muiTableCo
    //       />
    //     </Box>
    //   );
    // },
  });

  return (
    <>
      <Container component="main" maxWidth="xl" >
        <Card elevation={6} sx={{ width: "100%", marginBottom: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography component="div">Documentacion</Typography>
          </Box>
          <Divider />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2}}>
            <AdvisorController
              {...objForm}
              label="Asesor de seguros"
              name={`p_advisor_selected_${index}`}
              //codBroker={selectedBroker}
              onChange={handleBroker}
            />
          </Box>

          <Box>
            <MaterialReactTable table={table} />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default page;






