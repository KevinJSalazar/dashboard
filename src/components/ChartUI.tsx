import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
  temperature: number[];
  relativeHumidity: number[];
  labels: string[];
}

export default function ChartUI(props: ChartUIProps) {
  const { temperature, relativeHumidity, labels } = props;

  if (!temperature.length || !relativeHumidity.length || !labels.length) {
    return (
      <Typography variant="body1">
        No hay datos para el gráfico
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y Humedad Relativa (primeras 24h)
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: temperature, label: 'Temperatura (°C)' },
          { data: relativeHumidity, label: 'Humedad Relativa (%)' },
        ]}
        xAxis={[{ scaleType: 'point', data: labels }]}
      />
    </>
  );
}