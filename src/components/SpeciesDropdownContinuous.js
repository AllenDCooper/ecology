import React, { useEffect } from 'react';
import { Dropdown } from '@wwnds/react';


const SpeciesDropdownContinuous = (props) => {
console.log('continuous run')
  return (
    <Dropdown
      label="Choose a species"
      buttonContents={Object.keys(props.speciesObj)[0]}
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

export default SpeciesDropdownContinuous;