import React from 'react';

const Explanation = (props) => {
  console.log(props)

  let explanatoryText = ""

  const {a, r1, k1, n10, b, r2, k2, n20, t, tmax} = props.inputVals

  if(k2 < (k1 / a) && k1 < (k2 / b)) {
    explanatoryText = "Species 1 and 2 coexist in stable equilibrium"
  } else if(k2 >= (k1 / a) && k1 >= (k2 / b)) {
    explanatoryText = "Unstable equilibrium"
  } else if(k2 <= (k1 / a) && k1 >= (k2 / b)) {
    explanatoryText="Species 1 wins"
  } else if(k2 >= (k1 / a) && k1 <= (k2 / b)) {
    explanatoryText="Species 2 wins"
  }
  return(
    <p>{explanatoryText}</p>
  )
}

export default Explanation