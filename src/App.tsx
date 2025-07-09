//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';

function App() {
  const dataFetcherOutput = DataFetcher();

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector
        <SelectorUI/>
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        {dataFetcherOutput.loading && (
          <Grid size={12}>
            <div>Cargando datos...</div>
          </Grid>
        )}
        {dataFetcherOutput.error && (
          <Grid size={12}>
            <div style={{ color: 'red' }}>{dataFetcherOutput.error}</div>
          </Grid>
        )}
        {dataFetcherOutput.data && (
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.data.current.temperature_2m}°C`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura aparente'
                description={`${dataFetcherOutput.data.current.apparent_temperature}°C`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={`${dataFetcherOutput.data.current.wind_speed_10m} km/h`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={`${dataFetcherOutput.data.current.relative_humidity_2m}%`}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
