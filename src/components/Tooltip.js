import React, { useState } from 'react';
import { Tooltip } from '@wwnds/react';
import { Button } from '@wwnds/react';

const ButtonWithTooltip = (props) => {
  const [button, setButton] = useState(null);

  return (
    <div style={{ margin: '0' }}>
      <Button className='input-label-btn' variant="solid" ref={setButton}>{props.tooltipName}</Button>
      <Tooltip
        placement="top"
        reference={button}
      >
        {props.tooltipText}
      </Tooltip>
    </div>
  );
}

export default ButtonWithTooltip