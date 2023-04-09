import React from "react";

// this component creates a visual representation of a value (n) by rendering an element n times. 
// to improve load time, it prebuilds chunks of elements based on the size of n, and renders the chunks.
const VisualOutput = (props) => {
  console.log(props.nValue)
  // place a ceiling on nVal to prevent crashing
  const nValAdj = props.nValue > 1000 ? "1000.00" : props.nValue

  // get the order of magnitude of the nVal
  const numOfDigits = nValAdj.toString().length - 2

  // create an array of all values that are (1) less than nVal and (2) only one order of magnitude smaller than nVal
  const newArr = []
  // const nScale = Math.pow(10, numOfDigits - 1) / 10
  // console.log(nScale)
  const fontSize = 128 / (Math.pow(2, numOfDigits))

  // for (let i = 0; i < nValAdj / nScale; i++) {
  //   newArr.push(i)
  // }
  for (let i = 0; i < Math.round(nValAdj); i++) {
    newArr.push(i)
  }

  // function that returns a prebuilt chunk of elements to be rendered 
  // const getChunk = () => {
  //   let chunkArr = []
  //   for (let i = 0; i < nScale; i++) {
  //     chunkArr = [...chunkArr, <span style={{fontSize: fontSize + 'px', margin: '0 2px'}}>&#129451;</span>]
  //   }
  //   return chunkArr
  // }

  return (
    newArr.map(element => (
      // getChunk()
      <span style={{ fontSize: fontSize + 'px', margin: '0 2px' }}>
        {/* &#129451; */}
        {props.emoji}
      </span>
    ))
  )
}

export default VisualOutput