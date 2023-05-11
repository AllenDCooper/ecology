import React from "react";
import { Line } from "react-chartjs-2";


import { CategoryScale, Chart } from "chart.js";

Chart.register(CategoryScale);

function LineChart(props) {
  console.log(props)
  console.log(props.graphOptions)
  const title = ``

  const x = {
    min: 0,
    max: props.chartTitle==='isoclines' ? 500 : 1000,
    title: {
      display: true,
      text: 'Time (t)',
      font: {
        weight: '900',
      }
    },
    grid: {
      drawOnChartArea: false,
    },
    ticks: {
      maxTicksLimit: 20,
      maxRotation: 0,
      minRotation: 0
    }
  }
  const y = {
    // min: 0,
    // max: 120,
    title: {
      display: true,
      text: 'Population (N)',
      font: {
        weight: '900',
      }
    },
    grid: {
      drawOnChartArea: false
    },
    ticks: {
      // maxTicksLimit: 5,
    }
  }
  const options = {
    // aspectRatio: props.graphOptions.aspectRatio,
    plugins: {
      title: {
        display: false,
        text: title
      },
      legend: {
        display: true,
        labels: {
          filter: (legendItem, data) => {
            // console.log(data)
            // console.log(data.datasets)
            // console.log(data.datasets[0])
            // console.log(typeof legendItem.datasetIndex)
            return !data.datasets[legendItem.datasetIndex].isPoint
          },
          padding: 15,
          boxHeight: 5,
        }
      }
    },
    scales: {
      x: { ...x },
      y: { ...y, ...props.speciesSettings.y },
    },
    animations: false
  }

  const returnOptions = (options) => {
    return { ...options, ...props.graphOptions }
  }

  return (
    <div className={props.multipleCharts ? "chart-container-split" : "chart-container"}>
      {/* <h5 className='chart-title'>{props.chartTitle}</h5> */}
      <Line
        data={props.chartData}
        options={returnOptions(options)}
      />
    </div>
  );
}
export default LineChart;