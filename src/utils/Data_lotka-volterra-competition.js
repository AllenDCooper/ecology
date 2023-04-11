const LotkaVolterraCompetition = {
  key: 0,
  parametersObj: {
    species1:
    {
      a: {
        start: 0.63,
        min: 0,
        max: 2,
        step: 0.01,
        tooltipName: [<span><em>&alpha;</em></span>],
        tooltipText: [<span><em>&alpha;</em>: competition coefficient, which translates the relative effect of an individual of species 2 into units of individuals of species 1. </span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      r1: {
        start: 0.55,
        min: -1,
        max: 2,
        step: 0.1,
        tooltipName: [<span>r<sub>1,max</sub></span>],
        tooltipText: [<span><em>r<sub>1,max</sub></em>: instantaneous per capita rate of population growth of species 1</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      k1: {
        start: 250,
        min: 0,
        max: 300,
        step: 1,
        tooltipName: [<span>K<sub>1</sub></span>],
        tooltipText: [<span><em>K<sub>1</sub></em>: carrying capacity of species 1</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      n10: {
        start: 10,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>N<sub>1,0</sub></span>],
        tooltipText: [<span><em>N<sub>1,0</sub></em>: starting population abundance of species 1</span>],
        show: {
          Continuous: true,
          Discrete: true
        }
      },
    },
    species2: {
      b: {
        start: 0.53,
        min: 0,
        max: 2,
        step: 0.01,
        tooltipName: [<span><em>&beta;</em></span>],
        tooltipText: [<span><em>&beta;</em>: competition coefficient, which translates the relative effect of an individual of species 1 into units of individuals of species 2. </span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      r2: {
        start: 0.55,
        min: -1,
        max: 2,
        step: 0.1,
        tooltipName: [<span>r<sub>2,max</sub></span>],
        tooltipText: [<span><em>r<sub>2,max</sub></em>: instantaneous per capita rate of population growth of species 2</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      k2: {
        start: 200,
        min: 0,
        max: 300,
        step: 1,
        tooltipName: [<span>K<sub>2</sub></span>],
        tooltipText: [<span><em>K<sub>2</sub></em>: carrying capacity of species 2</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      n20: {
        start: 10,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>N<sub>2,0</sub></span>],
        tooltipText: [<span><em>N<sub>2,0</sub></em>: starting population abundance of species 2</span>],
        show: {
          Continuous: true,
          Discrete: true
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
      },
      tmax: {
        start: 105,
        min: 0,
        max: 105,
        step: 1,
        tooltipName: [<span>t<sub>max</sub></span>],
        tooltipText: [<span><em>t<sub>max</sub></em>: maximum time value for model</span>],
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
    aspectRatio: 1.6,
  },
  modelSettings: {
    usingDiscrete: false,
  },
  header: {
    title: {
      Continuous: 'Lotka Volterra Competition Model',
      // Discrete: 'Exponential Growth Model - Discrete'
    },
    equation: {
      Continuous: [<div className="equation-heading-container" style={{ display: "flex" }}>
        <h5 className="equation-heading" style={{ display: "inline-flex" }}>
          <table style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>1</sub></em></td>
            </tr>
            <tr>
              <td><em>dt</em></td>
            </tr>
          </table>
          <span style={{ display: "inline-block", margin: "auto" }}>
            = <em>N<sub>1</sub> r<sub>1</sub></em></span>
          <table
            style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>K<sub>1</sub> - N<sub>1</sub> - &alpha;N<sub>2</sub></em></td>
            </tr>
            <tr>
              <td><em>K<sub>1</sub></em></td>
            </tr>
          </table>
        </h5><h5 className="equation-heading" style={{ display: "inline-flex" }}>
          <table style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>2</sub></em></td>
            </tr>
            <tr>
              <td><em>dt</em></td>
            </tr>
          </table>
          <span style={{ display: "inline-block", margin: "auto" }}>
            = <em>N<sub>2</sub> r<sub>2</sub></em></span>
          <table
            style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>K<sub>2</sub> - N<sub>2</sub> - &beta;N<sub>1</sub></em></td>
            </tr>
            <tr>
              <td><em>K<sub>2</sub></em></td>
            </tr>
          </table>
        </h5></div>],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default LotkaVolterraCompetition