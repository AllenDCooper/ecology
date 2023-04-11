const Exponential = {
  key: 0,
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
  equationsObj: {
    // tangent equation formula that calculates y values from given parametersObj
    Continuous: {
      plot: true,
      alwaysShow: false,
      isDiscrete: false,
      addPoint: true,
      label: 'N(t)',
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
    tangent: {
      plot: true,
      alwaysShow: false,
      isDiscrete: false,
      addPoint: false,
      label: "dN/dt",
      format: {
        backgroundColor: [
          'white'
        ],
        borderColor: "black",
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [10, 5],
        hidden: true,
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
    calcM: {
      plot: false,
      alwaysShow: false,
      isDiscrete: false,
      addPoint: false,
      calc: (x, hook) => {
        const { t, n0, k, rMax, rDis } = hook
        const m = (n0 * rMax * Math.exp(rMax * t))
        return parseFloat(m).toFixed(2)
      }
    },
  },
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
      Continuous: [<span>N<sub>t</sub> = <em>N<sub>0</sub>e<sup>rt</sup></em></span>],
      Discrete: [<>
        <span style={{ display: "inline-block", margin: "auto" }}>
          <em>N<sub>t+1 </sub> </em> = <em>N<sub>t</sub> + N<sub>t</sub> r<sub>dis</sub></em></span>
        <table
          style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
          <tr>
            <td style={{ borderBottom: "1px solid black" }}><em>K - N<sub>t</sub></em></td>
          </tr>
          <tr>
            <td><em>K</em></td>
          </tr>
        </table>
      </>],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default Exponential