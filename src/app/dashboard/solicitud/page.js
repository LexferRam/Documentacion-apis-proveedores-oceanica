"use client";

import React from "react";
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
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


export const data = [
  {
    firstName: 'Dylan',
    lastName: 'Murray',
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    subRows: [
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
        subRows: [
          {
            firstName: 'Jordane',
            lastName: 'Homenick',
            address: '1234 Brakus Inlet',
            city: 'South Linda',
            state: 'West Virginia',
          },
          {
            firstName: 'Jordan',
            lastName: 'Clarkson',
            address: '4882 Palm Rd',
            city: 'San Francisco',
            state: 'California',
          },
        ],
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
      },
    ],
  },
  {
    firstName: 'Raquel',
    lastName: 'Kohler',
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
    subRows: [
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
      },
    ],
  },
];

const page = () => {

  const columns = useMemo (
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },

      {
        accessorKey: 'state',
        enableColumnOrdering: false,
        header: 'State',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableExpanding: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    getSubRows: (row) => row.subRows, //default
    initialState: { expanded: true }, //expand all rows by default
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
  });

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Card elevation={6} sx={{ width: "100%", padding: 3, marginBottom: 3 }}>
          <Box sx={{ p: 2 }}>
            <Typography component="div">Toothbrush</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
          <MaterialReactTable table={table} />
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default page;
