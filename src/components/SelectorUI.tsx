import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SelectorUI() {

return (
   <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
         labelId="city-select-label"
         id="city-simple-select"
         label="Ciudad">
         <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
         <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
         <MenuItem value={"quito"}>Quito</MenuItem>
         <MenuItem value={"manta"}>Manta</MenuItem>
         <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>

   </FormControl>
   )
}