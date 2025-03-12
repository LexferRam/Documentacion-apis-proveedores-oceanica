"use client";

import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

const layout = ({children}) => {
  return (
    <>
      <Header />
      <CssBaseline />
      <Header /> 
     <Sidebar />
     {children}
    </>
  );
};

export default layout;
