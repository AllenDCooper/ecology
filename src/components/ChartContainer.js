import React from 'react';
import LineChart from './LineChart';

const ChartContainer = (props) => {
  console.log(props)
  // function that takes an equation and parameter values to generates an array of data to be used by chartjs to plot a graph
  const generateDataSetFromFunction = (equation, inputObj, isPoint) => {
    const newDataSetArr = []
    const interval = equation.logisticType === 'Discrete' ? 1 : 10
    if (equation.isRK) {
      const outputArr = equation.calc(props.tMax, inputObj)
      const h = props.tMax / 1000;
      console.log(h)
      const newDataSetArr = []
      for (let i = 0; i < outputArr.length; i++) {
        let newDataPointObj = {
          id: i * h,
          xValue: i * h,
          value: outputArr[i]
        }
        newDataSetArr.push(newDataPointObj);
      }
      return newDataSetArr
    }
    else {
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
      if (value.isRK) {
        let newPointSet1
        let newPointSet2
        const dataArr = generateDataSetFromFunction(value, inputObj, false)
        console.log(dataArr)
        if (index === 0) {
          newLabel.push(...dataArr.map(data => data.xValue.toFixed(0)))
        }
        if (value.plot) {
          const newSet1 = {
            label: value.label.graph1,
            data: dataArr.map(data => data.value[0]),
            ...returnFormat(value.format.graph1)
          }
          const newSet2 = {
            label: value.label.graph2,
            data: dataArr.map(data => data.value[1]),
            ...returnFormat(value.format.graph2)
          }
          if (value.addPoint) {
            let pointIndex = Math.floor((inputObj.t / props.tMax) * 1000)
            console.log(pointIndex)
            console.log(dataArr[pointIndex])
            newPointSet1 = {
              label: '',
              data: dataArr.map((data, index) => (index === pointIndex ? data.value[0] : null)),
              backgroundColor: ['black'], borderColor: 'black', borderWidth: 3, pointRadius: 3, order: 0,
              isPoint: true,
            }
            newPointSet2 = {
              label: '',
              data: dataArr.map((data, index) => (index === pointIndex ? data.value[1] : null)),
              backgroundColor: ['black'], borderColor: 'black', borderWidth: 3, pointRadius: 3, order: 0,
              isPoint: true,
            }
            newDataset.push(newPointSet1, newPointSet2)
          }
          newDataset.push(newSet1, newSet2)
        }
      } else {
        if (index === 0) {
          newLabel.push(...generateDataSetFromFunction(value, inputObj, false).map(data => data.xValue.toFixed(0)))
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
              backgroundColor: ['black'], borderColor: 'black', borderWidth: 3, pointRadius: 3, order: 0, isPoint: true,

            }
            newDataset.push(newPointSet)
          }
          newDataset.push(newSet)
        }
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
      multipleCharts={props.multipleCharts}
    />
  )
}

export default ChartContainer;