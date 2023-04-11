import React, { useEffect, useState } from 'react';
import { Dropdown } from '@wwnds/react';


const SpeciesDropdown = (props) => {
  return (
    <Dropdown
      label="Choose a species"
      buttonContents={Object.keys(props.speciesObj)[0]}
      onChange={props.handleSpeciesChange}
      key={props.dataSelect + props.logisticType}
      buttonClass='species-dropdown-btn'
    >
      {Object.keys(props.speciesObj).map(key => (
        <Dropdown.Option
          name={key}
        >{key}</Dropdown.Option>
      ))}
    </Dropdown>
  )
}

export default SpeciesDropdown;