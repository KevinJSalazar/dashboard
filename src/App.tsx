import { useState } from 'react'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI'; // Importar TableUI
import ChartUI from './components/ChartUI'; // Importar ChartUI
import CohereBubble from './components/CohereBubble'; // Importa el componente CohereBubble
import RecomendationUI from './components/RecomendationUI'; // Importar RecomendationUI

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
      <Grid size={{ xs: 12, md: 3 }}>
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
      <Grid size={{ xs: 12, md: 12 }}>
         <ChartUI selectedCity={selectedCity} /> {/* Pasar selectedCity al ChartUI */}
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 8 }}>
        <TableUI selectedCity={selectedCity} /> {/* Pasar selectedCity al TableUI */}
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 4 }}>
        {dataFetcherOutput.data && (
          <RecomendationUI
            temperature_2m={dataFetcherOutput.data.current.temperature_2m}
            relative_humidity_2m={dataFetcherOutput.data.current.relative_humidity_2m}
            wind_speed_10m={dataFetcherOutput.data.current.wind_speed_10m}
            apparent_temperature={dataFetcherOutput.data.current.apparent_temperature}
          />
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}></Grid>

      {/* Botón flotante para abrir el chatbot de Cohere */}
      <CohereBubble 
      dataFetcher = {dataFetcherOutput}
      />
    </Grid>
  );
}

export default App