import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material';


import React from 'react';

function App() {
  return (
        <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector</Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

         {/* Indicadores */}
         <Grid>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         sx={{ display: { xs: "none", md: "block"} }} >
         <Grid>Elemento: Gráfico</Grid>

         {/* Tabla */}
         sx={{ display: { xs: "none", md: "block"} }} >
         <Grid>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

      </Grid>
  );
}

export default App
