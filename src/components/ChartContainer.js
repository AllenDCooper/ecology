import React from 'react';
import LineChart from './LineChart';

const ChartContainer = (props) => {
  console.log(props)
  // function that takes an equation and parameter values to generates an array of data to be used by chartjs to plot a graph
  const generateDataSetFromFunction = (equation, inputObj, isPoint) => {
    const newDataSetArr = []
    const interval = equation.logisticType === 'Discrete' ? 1 : 10
    for (let i = 0; i <= props.tMax * interval; i++) {
      let newDataPointObj = {}
      const nt = equation.calc(i / interval, inputObj)
      if (isPoint) {
        if (i === (inputObj.t * interval)) {
          newDataPointObj = {
            id: i * interval,
            xValue: i * interval,
            value: nt,
          }
        } else {
          newDataPointObj = {}
        }
      } else {
        newDataPointObj = {
          id: i / interval,
          xValue: i / interval,
          value: nt
        }
      }
      newDataSetArr.push(newDataPointObj);
    }
    return (newDataSetArr)
  }
  const returnFormat = (format) => {
    let formatObj = {}
    Object.entries(format).forEach(([key, value]) => {
      formatObj[key] = value
    })
    return formatObj
  }
  // function that returns the complete sets of chart data, to be passed into LineChart component as props
  const generateChartDataObj = (inputObj) => {
    const newDataset = [], newLabel = []
    const newEquationsObjArr = Object.entries(props.equationsObj).filter(([key, value]) => (props.logisticType === value.logisticType) || value.alwaysShow)
    newEquationsObjArr.forEach(([key, value], index) => {
      if (index === 0) {
        newLabel.push(...generateDataSetFromFunction(value, inputObj, false).map(data => data.xValue))
      }
      let newPointSet
      if (value.plot) {
        const newSet = {
          label: value.label,
          data: generateDataSetFromFunction(value, inputObj, false).map(data => data.value),
          ...returnFormat(value.format)
        }
        if (value.addPoint) {
          newPointSet = {
            label: '',
            data: generateDataSetFromFunction(value, inputObj, true).map(data => data.value),
            backgroundColor: ['black'], borderColor: 'black', borderWidth: 3, pointRadius: 3, order: 0
          }
          newDataset.push(newPointSet)
        }
        newDataset.push(newSet)
        console.log(newDataset)
      }
    })
    return ({
      labels: newLabel,
      datasets: newDataset
    })
  }
  return (
    <LineChart
      chartData={generateChartDataObj(props.inputVals)}
      speciesSettings={props.speciesSettings}
      graphOptions={props.graphOptions}
    />
  )
}

export default ChartContainer;