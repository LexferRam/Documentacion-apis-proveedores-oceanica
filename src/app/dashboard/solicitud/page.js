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

const page = () => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Card elevation={6} sx={{ width: "100%", padding: 3, marginBottom: 3 }}>
          <Box sx={{ p: 2 }}>
            <Typography component="div">Toothbrush</Typography>
          </Box>
          <Divider />

        </Card>
      </Container>
    </>
  );
};

export default page;
