import React from 'react';

const Header = (props) => {

  return (
    <header>
      <h2 className='chart-title'>
        {props.logisticType === 'Continuous' ?
          <span>{props.header.title.Continuous}</span> :
          <span>{props.header.title.Discrete}</span>}
      </h2>
      <div className="equation-heading-container" >
        <h3 className="equation-heading">
          {props.logisticType === 'Continuous' ?
            props.header.equation.Continuous
            :
            props.header.equation.Discrete
          }
        </h3>
      </div>
      <p className='directions-text' >{props.header.directionsText}</p>
    </header>
  )
}

export default Header