const Logistic = {
  key: 1,
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
      rDis: {
        start: .2,
        min: -1,
        max: 3,
        step: .1,
        tooltipName: [<span>r<sub>dis</sub></span>],
        tooltipText: [<span><em>r<sub>dis</sub></em>: per capita rate of population growth</span>],
        show: {
          Continuous: false,
          Discrete: true
        }
      },
      k: {
        start: 100,
        min: 0,
        max: 200,
        step: 1,
        tooltipName: [<span>K</span>],
        tooltipText: [<span><em>K</em>: carrying capacity</span>],
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
        max: 40,
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
    Continuous: {
      Cat: {
        values: { t: 0, rMax: 1, n0: 10, k: 100, rDis: .2 },
        emoji: [<span>&#x1F408;</span>],
        settings: { y: { min: 0, max: 120 }, x: {} }
      },
      Ant: {
        values: { t: 0, rMax: 0.8, n0: 10, k: 80, rDis: .3 },
        emoji: [<span>&#128028;</span>],
        settings: { y: { min: 0, max: 100 }, x: {} }
      },
      Gorilla: {
        values: { t: 0, rMax: 0.2, n0: 10, k: 120, rDis: .1 },
        emoji: [<span>&#x1F98D;</span>],
        settings: { y: { min: 0, max: 140 }, x: {} }
      }
    },
    Discrete: {
      Beaver: {
        values: { t: 0, rMax: 1, n0: 10, k: 100, rDis: .2 },
        emoji: [<span>&#129451;</span>],
        settings: { y: { min: 0, max: 120 }, x: {} }
      },
      Frog: {
        values: { t: 0, rMax: 0.8, n0: 10, k: 80, rDis: .3 },
        emoji: [<span>&#128056;</span>],
        settings: { y: { min: 0, max: 120 }, x: {} }
      },
      Fly: {
        values: { t: 0, rMax: 0.2, n0: 10, k: 110, rDis: .1 },
        emoji: [<span>&#129712;</span>],
        settings: { y: { min: 0, max: 120 }, x: {} }
      }
    }
  },
  equationsObj: [
    {
      name: 'Population Density',
      plot: true,
      populationDensity: true,
      alwaysShow: true,
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
        let numerator = (k * n0)
        let denominator = (n0 + ((k - n0) * Math.exp(-rMax * x)))
        const equationOutput = numerator / denominator
        return equationOutput.toFixed(2)
      }
    },
    {
      name: 'Population Density',
      plot: true,
      alwaysShow: false,
      logisticType: "Discrete",
      addPoint: true,
      displayOutput: true,
      label: 'N(t)',
      tooltipName: [<span>N<sub>t</sub></span>],
      tooltipText: [<span><em>N<sub>t</sub></em>: Ending population abundance</span>],
      format: {
        backgroundColor: ['blue'],
        borderColor: 'blue',
        borderWidth: 3,
        pointRadius: 0,
      },
      calc: (x, hook) => {
        if (x % 1 === 0) {
          const { t, n0, k, rMax, rDis } = hook
          let nt = n0;
          for (let i = 0; i < x; i++) {
            let newNt = nt + nt * rDis * ((k - nt) / k)
            nt = newNt
          }
          return nt.toFixed(2)
        } else {
          return null
        }
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
        const y0 = Logistic.equationsObj.filter(eq => eq.name === "Continuous")[0].calc(t, hook)
        // calculate derivative of N(t) to get m
        const mNumerator = k * (k - n0) * (n0 * rMax) * Math.exp(-rMax * t)
        const mDenominator = Math.pow((((k - n0) * Math.exp(-rMax * t)) + n0), 2)
        const m = mNumerator / mDenominator
        const b = (y0 - (m * t))
        const equationOutput = ((m * (x)) + b)
        return equationOutput;
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
        const mNumerator = k * (k - n0) * (n0 * rMax) * Math.exp(-rMax * x)
        const mDenominator = Math.pow((((k - n0) * Math.exp(-rMax * x)) + n0), 2)
        const m = mNumerator / mDenominator
        return parseFloat(m).toFixed(2);
      }
    },
    {
      name: 'kAsymptote',
      plot: true,
      alwaysShow: false,
      logisticType: "Continuous",
      addPoint: false,
      displayOutput: false,
      label: 'K',
      format: {
        backgroundColor: [
          'white'
        ],
        borderColor: "darkblue",
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [3, 3]
      },
      calc: (x, hook) => {
        const { t, n0, k, rMax, rDis } = hook
        return k
      }
    },
  ],
  graphSettings: {
    aspectRatio: 1.4,
  },
  modelSettings: {
    usingDiscrete: true
  },
  header: {
    title: {
      Continuous: 'Logistic Growth Model - Continuous',
      Discrete: 'Logistic Growth Model - Discrete'
    },
    equation: {
      Continuous: [<img className='equation-img-lg' src='./assets/logistic.png' alt='logistic continuous equation'/>],
      Discrete: [<img className='equation-img-lg' src='./assets/logistic-discrete.png' alt='logistic discrete equation'/>],
      // Continuous: [<>
      //   <table style={{ display: "inline-block", textAlign: "center", marginRight: "20px" }}>
      //     <tr>
      //       <td style={{ borderBottom: "1px solid black" }}><em>dN</em></td>
      //     </tr>
      //     <tr>
      //       <td><em>dt</em></td>
      //     </tr>
      //   </table>
      //   <span style={{ display: "inline-block", margin: "auto" }}>
      //     =  <em>Nr<sub>max</sub></em></span>
      //   <table
      //     style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
      //     <tr>
      //       <td style={{ borderBottom: "1px solid black" }}><em>K - N</em></td>
      //     </tr>
      //     <tr>
      //       <td><em>K</em></td>
      //     </tr>
      //   </table>
      // </>],
      // Discrete: [<>
      //   <span style={{ display: "inline-block", margin: "auto" }}>
      //     <em>N<sub>t+1 </sub> </em> = <em>N<sub>t</sub> + N<sub>t</sub> r<sub>dis</sub></em></span>
      //   <table
      //     style={{ display: "inline-block", textAlign: "center", marginLeft: "10px", borderLeft: "2px solid black", borderRadius: "10px", paddingLeft: "10px", borderRight: "2px solid black", paddingRight: "10px" }}>
      //     <tr>
      //       <td style={{ borderBottom: "1px solid black" }}><em>K - N<sub>t</sub></em></td>
      //     </tr>
      //     <tr>
      //       <td><em>K</em></td>
      //     </tr>
      //   </table>
      // </>],
    },
    directionsText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus id interdum velit laoreet id donec. Nisl vel pretium lectus quam id leo in vitae turpis. Mattis enim ut tellus elementum sagittis. Hac habitasse platea dictumst vestibulum rhoncus.'
  }
}

export default Logistic 