import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
  temperature: number[];
  relativeHumidity: number[];
  labels: string[];
}

function combineArrays(arrLabels: Array<string>, arrTemperature: Array<number>, arrHumidity: Array<number>) {
  return arrLabels.map((label, index) => ({
    id: index,
    label: label,
    temperature: arrTemperature[index],
    relativeHumidity: arrHumidity[index]
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'label',
    headerName: 'Hora',
    width: 150,
  },
  {
    field: 'temperature',
    headerName: 'Temperatura (°C)',
    width: 150,
  },
  {
    field: 'relativeHumidity',
    headerName: 'Humedad Relativa (%)',
    width: 170,
  },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 200,
    valueGetter: (_, row) => `${row.label || ''} ${row.temperature || ''}°C ${row.relativeHumidity || ''}%`,
  },
];

export default function TableUI({ temperature, relativeHumidity, labels }: TableUIProps) {
  if (
    !temperature ||
    !relativeHumidity ||
    !labels ||
    temperature.length === 0 ||
    relativeHumidity.length === 0 ||
    labels.length === 0
  ) {
    return <Box>No hay datos para la tabla</Box>;
  }

  // Puedes limitar a las primeras 24 horas si lo deseas:
  const rows = combineArrays(
    labels.slice(0, 24),
    temperature.slice(0, 24),
    relativeHumidity.slice(0, 24)
  );

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