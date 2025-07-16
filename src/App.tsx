import { useState } from 'react'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  const [selectedCity, setSelectedCity] = useState('guayaquil'); // Estado para la ciudad seleccionada

  const dataFetcherOutput = DataFetcher(selectedCity); // Pasar selectedCity a DataFetcher

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
        <SelectorUI onSelectCity={setSelectedCity} selectedCity={selectedCity} /> {/* Pasar setSelectedCity y selectedCity como props */}
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
                description={`${dataFetcherOutput.data.current.relative_humidity_2m} km/h`}
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
      <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico
        {dataFetcherOutput.data && (
          <ChartUI
            temperature={dataFetcherOutput.data.hourly.temperature_2m.slice(0, 24)}
            relativeHumidity={dataFetcherOutput.data.hourly.relative_humidity_2m.slice(0, 24)}
            labels={dataFetcherOutput.data.hourly.time.slice(0, 24)}
          />
        )}
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}>Elemento: Tabla
        {dataFetcherOutput.data && (
          <TableUI 
            temperature={dataFetcherOutput.data.hourly.temperature_2m.slice(0, 24)}
            relativeHumidity={dataFetcherOutput.data.hourly.relative_humidity_2m.slice(0, 24)}
            labels={dataFetcherOutput.data.hourly.time.slice(0, 24)}
          />
        )}
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App