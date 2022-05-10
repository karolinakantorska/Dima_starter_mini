import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


export default function InputCom({
  handleChange,
  name,
  items,
  text
}: {
  handleChange: any;
  name: string;
  text: string;
  items: string[];
  //items: typeof objektAlterArray | typeof objektTypeArray | typeof ServicesArray;
}) {

  return (
    <FormControl  >
      <InputLabel id={name}>{text}</InputLabel>
      <Select
        labelId={name}
        name={name}
        onChange={handleChange}
        placeholder={name}
        label={name}
        variant="outlined"
        sx={{ width: '300px' }}
      >
        {items.map(item => <MenuItem value={item} key={item} >{item}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

