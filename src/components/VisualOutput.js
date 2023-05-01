import React from "react";

// this component creates a visual representation of a value (n) by rendering an element n times. 

const VisualOutput = (props) => {
  const getFontSize = (nVal) => {
    if (nVal < 48) {
      return 24
    } else if (nVal >= 48 && nVal < 80) {
      return 18
    } else if (nVal >= 80 && nVal < 153) {
      return 12
    } else if (nVal >= 153 && nVal < 325) {
      return 8
    } else {
      return 6
    }
  }

  if (!Array.isArray(props.nValue)) {
    // place a ceiling on nVal to prevent crashing
    const nValAdj = props.nValue > 1000 ? "1000.00" : props.nValue
    const numOfDigits = nValAdj.toString().length - 2
    const newArr = []
    // scale font size
    const fontSize = getFontSize(nValAdj)

    for (let i = 0; i < Math.round(nValAdj); i++) {
      newArr.push(i)
    }

    return (
      newArr.map(element => (
        // getChunk()
        <span style={{ fontSize: fontSize + 'px', margin: '0 2px' }}>
          {/* &#129451; */}
          {props.emoji}
        </span>
      ))
    )
  } else {
    const curIndex = props.nValue.length - 1
    const N1 = props.nValue[curIndex][0]
    const N2 = props.nValue[curIndex][1]
    const numOfDigits = N1 + N2

    // const fontSize = 324 / (Math.pow(2, numOfDigits.toFixed(2).length - 1))
    const fontSize = getFontSize(numOfDigits)

    const getLargerN = () => {
      if (N1 > N2) {
        return {
          length: N1,
          ratio: N2 / N1,
          larger: 'N1',
          icon1: <span style={{ fontSize: fontSize, margin: '0 2px' }}>{props.emoji.species1[0]}</span>,
          icon2: <span style={{ fontSize: fontSize, margin: '0 2px' }}>{props.emoji.species2[0]}</span>,
        }
      } else {
        return {
          length: N2,
          ratio: N1 / N2,
          larger: 'N2',
          icon1: <span style={{ fontSize: fontSize, margin: '0 2px' }}>{props.emoji.species2[0]}</span>,
          icon2: <span style={{ fontSize: fontSize, margin: '0 2px' }}>{props.emoji.species1[0]}</span>,
        }
      }
    }

    const generateArr = () => {
      const nObj = getLargerN()
      const ratio = nObj.ratio
      let carriedRemainder = ratio;
      let newArr = []
      for (let i = 0; i < nObj.length; i++) {
        newArr = [...newArr, nObj.icon1]

        if (Math.round(carriedRemainder * 100) / 100 >= 1) {
          newArr = [...newArr, nObj.icon2]
          carriedRemainder += -1
        }
        carriedRemainder += (ratio)
      }
      return newArr
    }

    const outputArr = generateArr()

    return (
      outputArr.map(element => (
        element
      ))
    )
  }
}

export default VisualOutput