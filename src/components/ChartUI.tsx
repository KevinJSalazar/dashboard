import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

// Definimos la interfaz de props para ChartUI
interface ChartUIProps {
    selectedCity: string;
}

// Mapeo de ciudades a coordenadas (puedes reutilizar el mismo en DataFetcher, TableUI y ChartUI)
const cityCoordinates: { [key: string]: { latitude: number; longitude: number } } = {
    guayaquil: { latitude: -2.1894, longitude: -79.8891 },
    quito: { latitude: -0.1807, longitude: -78.4678 },
    manta: { latitude: -0.9677, longitude: -80.7089 },
    cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

export default function ChartUI({ selectedCity }: ChartUIProps) { // Recibir selectedCity como prop
   const [labels, setLabels] = useState<string[]>([]);
   const [values1, setValues1] = useState<number[]>([]);
   const [values2, setValues2] = useState<number[]>([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const coords = cityCoordinates[selectedCity];
            if (!coords) {
                console.error('Coordenadas no encontradas para la ciudad:', selectedCity);
                setLabels([]);
                setValues1([]);
                setValues2([]);
                return;
            }

            const res = await fetch(
               `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&timezone=America%2FChicago`
            );
            const data = await res.json();

            // Tomamos las primeras 7 horas (puedes ajustar esto)
            const hoursToShow = 7;
            setLabels(data.hourly.time.slice(0, hoursToShow));
            setValues1(data.hourly.temperature_2m.slice(0, hoursToShow));
            setValues2(data.hourly.wind_speed_10m.slice(0, hoursToShow));
         } catch (error) {
            console.error('Error al obtener datos del clima para el gráfico:', error);
         }
      }

      fetchData();
   }, [selectedCity]); // Ejecutar fetchData cada vez que selectedCity cambie

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Velocidad del viento (Open-Meteo) - {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1, label: 'Temperatura (2m) °C' },
               { data: values2, label: 'Velocidad del viento (10m) km/h' },
            ]}
            xAxis={[{ scaleType: 'point', data: labels }]}
         />
      </>
   );
}