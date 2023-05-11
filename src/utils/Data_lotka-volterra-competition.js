const LotkaVolterraCompetition = {
  key: 2,
  multipleCharts: true,
  chartTitle: ['Isoclines', 'Population Density'],
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
        start: 15,
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
    },
  },
  speciesObj: {
    key: 0,
    Continuous: {
      // 'Species1-Species2': {
      //   values: {
      //     a: 0.63, r1: 1, k1: 250, n10: 10,
      //     b: 0.53, r2: 1, k2: 200, n20: 15,
      //     t: 0, tmax: 105
      //   },
      //   name: {
      //     species1: 'Species1',
      //     species2: 'Species2'
      //   },
      //   emoji: {
      //     species1: [<span>&#x1F408;</span>],
      //     species2: [<span>&#x1F408;</span>],
      //   },
      //   settings: { y: { min: 0 }, x: { min: 0 } }
      // },
      'Rabbit-Mouse': {
        values: {
          a: 0.63, r1: 1, k1: 250, n10: 10,
          b: 0.53, r2: 1, k2: 200, n20: 15,
          t: 0, tmax: 105
        },
        name: {
          species1: 'Rabbit',
          species2: 'Mouse'
        },
        emoji: {
          species1: [<span>&#128007;</span>],
          species2: [<span>&#128000;</span>],
        },
        settings: {
          y: { min: 0, max: 500 },
          x: { min: 0, max: 500 }
        }
      },
      'Cat-Dog': {
        values: {
          a: 0.65, r1: 1.01, k1: 220, n10: 12,
          b: 0.50, r2: 1, k2: 210, n20: 14,
          t: 0, tmax: 105
        },
        name: {
          species1: 'Cat',
          species2: 'Dog'
        },
        emoji: {
          species1: [<span>&#x1F408;</span>],
          species2: [<span>&#x1F408;</span>],
        },
        // settings: { y: { min: 0, max: 500 }, x: { min: 0, max: 500 } }
      },
    }
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
        backgroundColor: ['blue'],
        borderColor: 'blue',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        const { a, k1 } = hook
        let equationOutput = ((k1 - x) / a)
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
        backgroundColor: ['orange'],
        borderColor: 'orange',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        const { b, k2 } = hook
        let equationOutput = k2 - (b * x)
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
      Continuous: 'Lotka Volterra Competition Model',
      // Discrete: 'Exponential Growth Model - Discrete'
    },
    equation: {
      Continuous: [<span><img className='equation-img-lg' src='./assets/lv-competition1.png' alt='Lotka-Volterra Competition equation 1' /><span className='equation-img-spacer'></span><img className='equation-img-lg' src='./assets/lv-competition2.png' alt='Lotka-Volterra Competition equation2' /></span>],

      // Continuous: [<div className="equation-heading-container" style={{ display: "flex" }}>
      //   <h5 className="equation-heading" style={{ display: "inline-flex" }}>
      //     <table style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
      //       <tr>
      //         <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>1</sub></em></td>
      //       </tr>
      //       <tr>
      //         <td><em>dt</em></td>
      //       </tr>
      //     </table>
      //     <span style={{ display: "inline-block", margin: "auto" }}>
      //       = <em>N<sub>1</sub> r<sub>1</sub></em></span>
      //     <table
      //       style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
      //       <tr>
      //         <td style={{ borderBottom: "1px solid black" }}><em>K<sub>1</sub> - N<sub>1</sub> - &alpha;N<sub>2</sub></em></td>
      //       </tr>
      //       <tr>
      //         <td><em>K<sub>1</sub></em></td>
      //       </tr>
      //     </table>
      //   </h5><h5 className="equation-heading" style={{ display: "inline-flex" }}>
      //     <table style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
      //       <tr>
      //         <td style={{ borderBottom: "1px solid black" }}><em>dN<sub>2</sub></em></td>
      //       </tr>
      //       <tr>
      //         <td><em>dt</em></td>
      //       </tr>
      //     </table>
      //     <span style={{ display: "inline-block", margin: "auto" }}>
      //       = <em>N<sub>2</sub> r<sub>2</sub></em></span>
      //     <table
      //       style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
      //       <tr>
      //         <td style={{ borderBottom: "1px solid black" }}><em>K<sub>2</sub> - N<sub>2</sub> - &beta;N<sub>1</sub></em></td>
      //       </tr>
      //       <tr>
      //         <td><em>K<sub>2</sub></em></td>
      //       </tr>
      //     </table>
      //   </h5></div >],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default LotkaVolterraCompetition