import { useState } from 'react'; // useState is still used to manage the select's value internally before passing it up
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

// Define the props interface for SelectorUI
interface SelectorUIProps {
    onSelectCity: (city: string) => void;
    selectedCity: string;
}

export default function SelectorUI({ onSelectCity, selectedCity }: SelectorUIProps) { // Destructure props
   // Remove cityInput state, as it will be managed by the parent
   // const [cityInput, setCityInput] = useState(''); // No longer needed here

   const handleChange = (event: SelectChangeEvent<string>) => {
    onSelectCity(event.target.value); // Call the prop function to update parent state
};

return (
   <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
         labelId="city-select-label"
         id="city-simple-select"
         label="Ciudad"
         value={selectedCity} // Use selectedCity from props
         onChange={handleChange} >
         <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
         <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
         <MenuItem value={"quito"}>Quito</MenuItem>
         <MenuItem value={"manta"}>Manta</MenuItem>
         <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {selectedCity && ( // Use selectedCity from props
         <p>
            Información del clima en{' '}
            <b>
              {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
            </b>
            .
         </p>
      )}
   </FormControl>
   )
}