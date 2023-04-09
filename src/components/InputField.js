import React from 'react';
import { TextField } from '@wwnds/react';
import Tooltip from '../components/Tooltip';


const InputField = (props) => {
  return (
    <TextField
      name={props.name}
      required
      validateOnChange
      type={"number"}
      max={props.max}
      min={props.min}
      step={props.step}
      value={props.value}
      onChange={props.handleInputChange}
      groupClass={'nds-field__group nds-field__group--text input-field'}
    >
      <Tooltip
        tooltipName={props.tooltipName}
        tooltipText={props.tooltipText}
        // tooltipName={[<span>r<sub>dis</sub></span>]}
        // tooltipText={[<span><em>r<sub>dis</sub></em>: per capita rate of population growth</span>]}
        />
    </TextField>
  )
}

export default InputField;