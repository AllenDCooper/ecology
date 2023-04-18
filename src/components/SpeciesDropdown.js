import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from '@wwnds/react';


const SpeciesDropdown = (props) => {
  return (
    <Dropdown
      // label="Species"
      // labelClass='nds-button--solid nds-button--primary nds-button input-label-btn'
      // labelId='species-dropdown-label'
      buttonContents={Object.keys(props.speciesObj)[0]}
      onChange={props.handleSpeciesChange}
      key={props.dataSelect + props.logisticType}
      buttonWidth={'100%'}
      buttonId='species-dropdown-btn'
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