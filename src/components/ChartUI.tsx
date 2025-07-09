import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

export default function ChartUI() {
   const [labels, setLabels] = useState<string[]>([]);
   const [values1, setValues1] = useState<number[]>([]);
   const [values2, setValues2] = useState<number[]>([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const res = await fetch(
               'https://api.open-meteo.com/v1/forecast?latitude=-1.25&longitude=-78.25&hourly=temperature_2m,wind_speed_10m&timezone=America%2FChicago'
            );
            const data = await res.json();

            // Tomamos las primeras 7 horas (puedes ajustar esto)
            const hoursToShow = 7;
            setLabels(data.hourly.time.slice(0, hoursToShow));
            setValues1(data.hourly.temperature_2m.slice(0, hoursToShow));
            setValues2(data.hourly.wind_speed_10m.slice(0, hoursToShow));
         } catch (error) {
            console.error('Error al obtener datos del clima:', error);
         }
      }

      fetchData();
   }, []);

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Velocidad del viento (Open-Meteo)
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