import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function AirlinesIncludedRadioButtons() {
  return (
    <FormControl className="m-0 p-0">
      <RadioGroup defaultValue="female" name="radio-buttons-group">
        <FormControlLabel
          value="female"
          control={<Radio size="small" className="text-themePurple" />}
          label="Alitalia"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="Lufthansa"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="Air France"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="Brussels Airlines"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="Air Italy"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label="Siberia"
        />
      </RadioGroup>
    </FormControl>
  );
}
