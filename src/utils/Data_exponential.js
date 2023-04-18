const Exponential = {
  multipleCharts: false,
  chartTitle: 'Population Density',
  parametersObj: {
    species1: {
      n0: {
        start: 10,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>N<sub>0</sub></span>],
        tooltipText: [<span><em>N<sub>0</sub></em>: starting population abundance</span>],
        show: {
          Continuous: true,
          Discrete: true
        }
      },
      rMax: {
        start: 1,
        min: -1,
        max: 2,
        step: 0.1,
        tooltipName: [<span>r<sub>max</sub></span>],
        tooltipText: [<span><em>r</em>: instantaneous per capita rate of population growth</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
    },
    general: {
      t: {
        start: 0,
        min: 0,
        max: 20,
        step: 1,
        tooltipName: [<span>t</span>],
        tooltipText: [<span><em>t</em>: time</span>],
        show: {
          Continuous: true,
          Discrete: true
        }
      }
    }
  },
  speciesObj: {
    key: 0,
    Continuous: {
      Cat: {
        values: { t: 0, rMax: 1, n0: 10 },
        emoji: [<span>&#x1F408;</span>],
        settings: { y: { min: 0 }, x: { min: 0 } }
      },
      Ant: {
        values: { t: 0, rMax: 0.8, n0: 10 },
        emoji: [<span>&#128028;</span>],
        settings: { y: { min: 0 }, x: { min: 0 } }
      },
      Gorilla: {
        values: { t: 0, rMax: 0.2, n0: 10 },
        emoji: [<span>&#x1F98D;</span>],
        settings: { y: { min: 0 }, x: { min: 0 } }
      }
    },
  },
  equationsObj: [
    // tangent equation formula that calculates y values from given parametersObj
    {
      name: 'Continuous',
      plot: true,
      alwaysShow: false,
      logisticType: "Continuous",
      addPoint: true,
      displayOutput: true,
      label: 'N(t)',
      tooltipName: [<span>N<sub>t</sub></span>],
      tooltipText: [<span><em>N<sub>t</sub></em>: Ending population abundance</span>],
      format: {
        backgroundColor: ['orange'],
        borderColor: 'orange',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        const { t, n0, k, rMax, rDis } = hook
        const nValue = (n0 * Math.exp(rMax * x))
        return nValue.toFixed(2)
      }
    },
    {
      name: 'tangent',
      plot: true,
      alwaysShow: false,
      logisticType: "Continuous",
      addPoint: false,
      displayOutput: false,
      isTangent: true,
      label: "dN/dt",
      tooltipName: [<span><em>dN/dt</em></span>],
      tooltipText: [<span><em>dN/dt</em>: instantaneous per capita rate of population growth</span>],
      format: {
        backgroundColor: [
          'white'
        ],
        borderColor: "black",
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [10, 5],
        hidden: false,
      },
      calc: (x, hook) => {
        const { t, n0, k, rMax, rDis } = hook
        const y0 = (n0 * Math.exp(rMax * t))
        const m = (n0 * rMax * Math.exp(rMax * t))
        const b = (y0 - (m * t))
        const equationOutput = ((m * (x)) + b)
        return parseFloat(equationOutput);
      }
    },
    {
      name: 'calcM',
      plot: false,
      alwaysShow: false,
      logisticType: "Continuous",
      addPoint: false,
      displayOutput: true,
      isTangent: true,
      tooltipName: [<span><em>dN/dt</em></span>],
      tooltipText: [<span><em>dN/dt</em>: instantaneous per capita rate of population growth</span>],
      calc: (x, hook) => {
        const { t, n0, k, rMax, rDis } = hook
        const m = (n0 * rMax * Math.exp(rMax * t))
        return parseFloat(m).toFixed(2)
      }
    },
  ],
  graphSettings: {
    aspectRatio: 2,
  },
  modelSettings: {
    usingDiscrete: false,
  },
  header: {
    title: {
      Continuous: 'Exponential Growth Model',
      Discrete: 'Exponential Growth Model - Discrete'
    },
    equation: {
      // Continuous: [<span>N<sub>t</sub> = <em>N<sub>0</sub>e<sup>rt</sup></em></span>],
      Continuous: [<img className='equation-img-sm' src='./assets/exponential.png' alt='exponential equation'/>],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default Exponential