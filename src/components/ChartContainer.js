import React from 'react';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';
import { Line } from 'react-chartjs-2';


const ChartContainer = (props) => {
  console.log(props)
  console.log(props.equationsObj[0].type)

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
    else if (equation.name === 'isocline1' || equation.name === 'isocline2') {
      for (let i = 0; i <= props.speciesSettings.x.max - 1; i++) {
        let newDataPointObj = {}
        const nt = equation.calc(i, inputObj)
        if (isPoint) {
          if (i === (inputObj.t)) {
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
            id: i,
            xValue: i,
            value: nt
          }
        }
        newDataSetArr.push(newDataPointObj);
      }
      console.log(newDataSetArr)
      return (newDataSetArr)
    }
    else if (equation.name === 'phase-plane') {
      const outputArr = equation.calc(props.tMax, inputObj)
      console.log(outputArr)
      // const h = props.tMax / 1000;
      const newDataSetArr = []
      for (let i = 0; i < outputArr.length; i++) {
        let newDataPointObj = {
          id: outputArr[i][0],
          xValue: outputArr[i][0],
          value: outputArr[i][1]
        }
        newDataSetArr.push(newDataPointObj);
      }
      console.log(newDataSetArr)
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
    console.log(newEquationsObjArr)
    newEquationsObjArr.forEach(([key, value], index) => {
      if (value.isRK) {
        let newPointSet1
        let newPointSet2
        const dataArr = generateDataSetFromFunction(value, inputObj, false)
        if (index === 0) {
          newLabel.push(...dataArr.map(data => data.xValue.toFixed(0)))
        }
        if (value.plot) {
          const newSet1 = {
            label: props.name.species1,
            data: dataArr.map(data => data.value[0]),
            ...returnFormat(value.format.graph1)
          }
          const newSet2 = {
            label: props.name.species2,
            data: dataArr.map(data => data.value[1]),
            ...returnFormat(value.format.graph2)
          }
          if (value.addPoint) {
            let pointIndex = Math.floor((inputObj.t / props.tMax) * 1000)
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
      }
      else if (value.name === 'phase-plane') {
        const dataArr = generateDataSetFromFunction(value, inputObj, false)
        newDataset.push(dataArr)
      }
      else {
        if (index === 0) {
          newLabel.push(...generateDataSetFromFunction(value, inputObj, false).map(data => data.xValue.toFixed(0)))
        }
        let newPointSet
        if (!value.isTangent || props.showTangent) {
          if (value.plot) {
            const newSet = {
              label: value.name === 'isocline1' ? props.name.species1 : value.name === 'isocline2' ? props.name.species2 : value.label,
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
      }
    })
    return ({
      labels: newLabel,
      datasets: newDataset
    })
  }
  return (
    <>
      {props.equationsObj[0].type==='scatter' ?
        <ScatterChart
          chartData={generateChartDataObj(props.inputVals)}
          speciesSettings={props.speciesSettings}
          graphOptions={props.graphOptions}
          multipleCharts={props.multipleCharts}
          chartTitle={props.chartTitle}
        />
        :
        <LineChart
          chartData={generateChartDataObj(props.inputVals)}
          speciesSettings={props.speciesSettings}
          graphOptions={props.graphOptions}
          multipleCharts={props.multipleCharts}
          chartTitle={props.chartTitle}
        />
      }
    </>
  )
}

export default ChartContainer;