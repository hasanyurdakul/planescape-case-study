import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function StopsRadioButtons() {
  return (
    <FormControl className="m-0 p-0">
      <RadioGroup defaultValue="female" name="radio-buttons-group">
        <FormControlLabel
          value="female"
          control={<Radio size="small" className="text-themePurple" />}
          label="Nonstop"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="1 Stop"
        />
        <FormControlLabel
          value="other"
          control={<Radio size="small" className="text-themePurple" />}
          label="2+ Stops"
        />
      </RadioGroup>
    </FormControl>
  );
}
