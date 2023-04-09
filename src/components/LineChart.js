import React from "react";
import { Line } from "react-chartjs-2";


import { CategoryScale, Chart } from "chart.js";

Chart.register(CategoryScale);

function LineChart(props) {
  const title = ``

  const x = {
    min: 0,
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
      // maxTicksLimit: 10,
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
    // aspectRatio: 1.6,
    plugins: {
      title: {
        display: false,
        text: title
      },
      legend: {
        display: true,
        labels: {
          filter: (legendItem, data) => {
            return legendItem.datasetIndex > 0
          },
          padding: 15,
          boxHeight: 5,
        }
      }
    },
    scales: {
      x: { ...x, ...props.speciesSettings.x },
      y: { ...y, ...props.speciesSettings.y },
    },
    animations: false
  }

  const returnOptions = (options) => {
    return { ...options, ...props.graphOptions }
  }

  return (
    <div className="chart-container">
      <Line
        data={props.chartData}
        options={returnOptions(options)}
      />
    </div>
  );
}
export default LineChart;