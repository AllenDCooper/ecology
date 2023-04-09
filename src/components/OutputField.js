import React from 'react';
import Tooltip from '../components/Tooltip';


const OutputField = (props) => {
  return (
    <span className='function-value-label-span'>
      <Tooltip
        tooltipName={props.tooltipName}
        tooltipText={props.tooltipText}
      />
      <span className='function-value-span'>
        {props.value}
      </span>
    </span>
  )
}

export default OutputField;