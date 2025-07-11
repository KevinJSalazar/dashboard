import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'label', headerName: 'Fecha', width: 150 },
   { field: 'value1', headerName: 'Temperatura (2m) °C', width: 150 },
   { field: 'value2', headerName: 'Velocidad del viento', width: 150 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

interface RowData {
   id: number;
   label: string;
   value1: number;
   value2: number;
}

// Definimos la interfaz de props para TableUI
interface TableUIProps {
    selectedCity: string;
}

// Mapeo de ciudades a coordenadas
const cityCoordinates: { [key: string]: { latitude: number; longitude: number } } = {
    guayaquil: { latitude: -2.1894, longitude: -79.8891 },
    quito: { latitude: -0.1807, longitude: -78.4678 },
    manta: { latitude: -0.9677, longitude: -80.7089 },
    cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

export default function TableUI({ selectedCity }: TableUIProps) { // Recibir selectedCity como prop
   const [rows, setRows] = useState<RowData[]>([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const coords = cityCoordinates[selectedCity];
            if (!coords) {
                console.error('Coordenadas no encontradas para la ciudad:', selectedCity);
                setRows([]); // Limpiar la tabla si no hay coordenadas
                return;
            }

            const res = await fetch(
               `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&timezone=America%2FChicago`
            );
            const data = await res.json();

            const labels = data.hourly.time.slice(0, 7); // primeras 7 horas
            const values1 = data.hourly.temperature_2m.slice(0, 7);
            const values2 = data.hourly.wind_speed_10m.slice(0, 7);

            const combined = combineArrays(labels, values1, values2);
            setRows(combined);
         } catch (error) {
            console.error('Error al obtener datos del clima para la tabla:', error);
         }
      }

      fetchData();
   }, [selectedCity]); // Ejecutar fetchData cada vez que selectedCity cambie

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}