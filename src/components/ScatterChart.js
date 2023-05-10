import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChart = (props) => {
  console.log(props.chartData.datasets[0])
  const dataArr = props.chartData.datasets[0]
  function DataObject(x, y) {
    this.x = x;
    this.y = y;
  }
  const newArr = dataArr.map(element =>
    new DataObject(element.xValue, element.value)
  )

  console.log(newArr)
  return (
    <div className={props.multipleCharts ? "chart-container-split" : "chart-container"}>
      {/* <h5 className='chart-title'>{props.chartTitle}</h5> */}
      <Scatter
        options={{
          aspectRatio: 1,
          elements: {
            point: {
              radius: 1,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: [
                "black"
              ],
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                padding: 15,
                boxHeight: 5,
              }
            }
          },
          scales: {
            x: {
              min: 0,
              max: 200,
              title: {
                display: true,
                text: 'N₁ (Prey)',
                font: {
                  weight: '900',
                }
              },
            },
            y: {
              min: 0,
              max: 200,
              title: {
                display: true,
                text: 'N₂ (Predator)',
                font: {
                  weight: '900',
                }
              },
            }
          }
        }}
        data={{
          datasets: [
            {
              label: "Phase-Plane",
              data: newArr
            }
          ]
        }}
      />
    </div>
  )
}

export default ScatterChart