const LotkaVolterraPredation = {
  key: 3,
  multipleCharts: true,
  parametersObj: {
    species1:
    {
      r: {
        start: 0.55,
        min: -1,
        max: 2,
        step: 0.1,
        tooltipName: [<span>r<sub>max</sub></span>],
        tooltipText: [<span><em>r<sub>max</sub></em>: instantaneous per capita rate of population growth of species 1</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      f: {
        start: 250,
        min: 0,
        max: 300,
        step: 1,
        tooltipName: [<span>f</span>],
        tooltipText: [<span><em>f</em>: the capture rate</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      np0: {
        start: 10,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>N<sub>p,0</sub></span>],
        tooltipText: [<span><em>N<sub>1,0</sub></em>: starting population abundance of species 1</span>],
        show: {
          Continuous: true,
          Discrete: true
        }
      },
    },
    species2: {
      cf: {
        start: 0.55,
        min: -1,
        max: 2,
        step: 0.1,
        tooltipName: [<span>cf</span>],
        tooltipText: [<span><em>cf</em>: the exploiter conversion factor</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      d: {
        start: 200,
        min: 0,
        max: 300,
        step: 1,
        tooltipName: [<span>d</span>],
        tooltipText: [<span><em>d</em>: per capita death rate</span>],
        show: {
          Continuous: true,
          Discrete: false
        }
      },
      ne0: {
        start: 15,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>N<sub>e,0</sub></span>],
        tooltipText: [<span><em>N<sub>e,0</sub></em>: starting population abundance of predator</span>],
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
        max: 105,
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
      'Fish-Eagle': {
        values: {
          t: 0, rMax: 1, n0: 10
        },
        name: {
          species1: 'Fish',
          species2: 'Eagle'
        },
        emoji: {
          species1: [<span>&#x1F408;</span>],
          species2: [],
        },
        settings: { y: { min: 0 }, x: { min: 0 } }
      },
    },
  },
  equationsObj: [
    // tangent equation formula that calculates y values from given parametersObj
    {
      name: 'isocline1',
      plot: true,
      alwaysShow: false,
      logisticType: "Continuous",
      addPoint: false,
      displayOutput: false,
      label: 'Species1',
      format: {
        backgroundColor: ['orange'],
        borderColor: 'orange',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        const { a, k1 } = hook
        let b = k1 / a
        let m = (-1 / a)
        let equationOutput = (m * x) + b
        return equationOutput
      }
    },
    {
      name: 'isocline2',
      plot: true,
      alwaysShow: true,
      logisticType: "Continuous",
      addPoint: false,
      displayOutput: false,
      label: "Species2",
      format: {
        backgroundColor: ['blue'],
        borderColor: 'blue',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        const { b, k2 } = hook
        let B = k2 / b
        let m = (-1 / b)
        let equationOutput = (m * x) + B
        return equationOutput
      }
    },
    {
      name: 'runRungeKutta4Method',
      plot: true,
      alwaysShow: true,
      logisticType: "Continuous",
      addPoint: true,
      displayOutput: true,
      isRK: true,
      label: {
        graph1: 'Species1',
        graph2: 'Species1'
      },
      tooltipName: [<span>N<sub>t</sub></span>],
      tooltipText: [<span><em>N<sub>t</sub></em>: Ending population abundance</span>],
      format: {
        graph1: {
          backgroundColor: ['blue'],
          borderColor: 'blue',
          borderWidth: 3,
          pointRadius: 0,
        },
        graph2: {
          backgroundColor: ['orange'],
          borderColor: 'orange',
          borderWidth: 3,
          pointRadius: 0,
        }
      },
      calc: (x, hook) => {
        const { a, b, r1, r2, k1, k2, n10, n20, t, tmax } = hook
        const Nt = 1000
        let ys = [[n10, n20]]
        const derivative = (X, a, b, k1, k2, r1, r2) => {
          let x = parseFloat(X[0]);
          let y = parseFloat(X[1]);
          let dotx = r1 * x * ((k1 - x - (a * y)) / k1)
          let doty = r2 * y * ((k2 - y - (b * x)) / k2)
          return [dotx, doty];
        }
        let h = tmax / Nt;
        let max = Math.floor(x / h)

        for (let i = 0; i < max; i++) {
          const rkFactor1 = [ys[i][0], ys[i][1]]
          const rk1 = derivative(rkFactor1, a, b, k1, k2, r1, r2)
          const rkFactor2 = [ys[i][0] + h / 2, ys[i][1] + (rk1[1] * (h / 2))]
          const rk2 = derivative(rkFactor2, a, b, k1, k2, r1, r2)
          const rkFactor3 = [ys[i][0] + h / 2, ys[i][1] + (rk2[1] * (h / 2))]
          const rk3 = derivative(rkFactor3, a, b, k1, k2, r1, r2)
          const rkFactor4 = [ys[i][0] + h, ys[i][1] + (rk3[1] * h)]
          const rk4 = derivative(rkFactor4, a, b, k1, k2, r1, r2)
          const xCalc = (ys[i][0] + ((rk1[0] + (2 * rk2[0]) + (2 * rk3[0]) + rk4[0]) / 6) * h);
          const yCalc = (ys[i][1] + ((rk1[1] + (2 * rk2[1]) + (2 * rk3[1]) + rk4[1]) / 6) * h);
          ys[i + 1] = [xCalc, yCalc]
        }
        console.log(ys)
        return ys
      },
    },
  ],
  graphSettings: {
    aspectRatio: 1,
  },
  modelSettings: {
    usingDiscrete: false,
  },
  header: {
    title: {
      Continuous: 'Lotka Volterra Predation Model',
      // Discrete: 'Exponential Growth Model - Discrete'
    },
    equation: {
      Continuous: [<div className="equation-heading-container" style={{ display: "flex" }}>
        <h5 className="equation-heading" style={{ display: "inline-flex" }}>
          <table style={{ display: "inline-block", textAlign: "center", marginRight: "10px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>p</sub></em></td>
            </tr>
            <tr>
              <td><em>dt</em></td>
            </tr>
          </table>
          <span style={{ display: "inline-block", margin: "auto" }}>=  <em>RN<sub>p</sub> &minus; fN<sub>p</sub>N<sub>e</sub></em></span>
        </h5><h5 className="equation-heading" style={{ display: "inline-flex" }}>
          <table style={{ display: "inline-block", textAlign: "center", marginRight: "10px" }}>
            <tr>
              <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>e</sub></em></td>
            </tr>
            <tr>
              <td><em>dt</em></td>
            </tr>
          </table>
          <span style={{ display: "inline-block", margin: "auto" }}>=  <em>cfN<sub>p</sub>N<sub>e</sub> &minus; dN<sub>e</sub></em></span>
        </h5></div >],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default LotkaVolterraPredation