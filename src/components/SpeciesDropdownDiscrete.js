import React, { useEffect } from 'react';
import { Dropdown } from '@wwnds/react';


const SpeciesDropdownDiscrete = (props) => {
console.log(`discrete run`)
  return (
    <Dropdown
      label="Choose a species"
      buttonContents={props.speciesSelected}
      onChange={props.handleSpeciesChange}
    >
      {Object.keys(props.speciesObj).map(key => (
        <Dropdown.Option
          name={key}
          // selected={key === props.speciesSelected}
        >{key}</Dropdown.Option>
      ))}
    </Dropdown>
  )
}

export default SpeciesDropdownDiscrete;