import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ArrivalTimeRadioButtons() {
  return (
    <FormControl className="m-0 p-0">
      <RadioGroup defaultValue="female" name="radio-buttons-group">
        <FormControlLabel
          value="female"
          control={<Radio size="small" className="text-themePurple" />}
          label="5:00 AM - 12:00 PM"
        />
        <FormControlLabel
          value="male"
          control={<Radio size="small" className="text-themePurple" />}
          label=" 12:00 PM - 5:00 PM"
        />
      </RadioGroup>
    </FormControl>
  );
}
