import { useState, useEffect, useRef } from "react";
import './App.css';
// DATA
// import { parametersObj, dataObj.speciesObj, equationsObj, graphSettings } from './utils/Data';
import Logistic from './utils/Data_logistic';
import Exponential from './utils/Data_exponential'
import LotkaVolterraCompetition from
  "./utils/Data_lotka-volterra-competition";
import LotkaVolterraPredation from "./utils/Data_lotka-volterra-predation";
// NORTON DESIGN SYSTEM
import { Button, Dropdown, Switch } from '@wwnds/react';
// COMPONENTS
import VisualOutput from "./components/VisualOutput";
import ChartContainer from "./components/ChartContainer";
import Header from "./components/Header";
import SpeciesDropdown from "./components/SpeciesDropdown";
import InputField from "./components/InputField";
import OutputField from "./components/OutputField";
// CHART.JS
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function App() {
  // HOOKS
  const [dataObj, setDataObj] = useState(Exponential)
  const [dataSelect, setDataSelect] = useState('Exponential')
  const [logisticType, setLogisticType] = useState('Continuous')
  const [speciesSelected, setSpeciesSelected] = useState(
    dataObj.speciesObj[logisticType] ?
      Object.keys(dataObj.speciesObj[logisticType])[0] :
      Object.keys(dataObj.speciesObj['Continuous'])[0]
  )
  // REFS
  const visualOutputRef = useRef(null);
  // helper function to set initial state
  const getStartObj = (parameterObj, speciesVals) => {
    const newObj = { species1: {}, species2: {}, general: {} }
    Object.entries(parameterObj.species1).forEach(([key, value]) => {
      newObj[key] = value.start
    })
    if (parameterObj.species2) {
      Object.entries(parameterObj.species2).forEach(([key, value]) => {
        newObj[key] = value.start
      })
    }
    Object.entries(parameterObj.general).forEach(([key, value]) => {
      newObj[key] = value.start
    })
    return { ...newObj, ...speciesVals.values }
  }
  // hook that stores graph input values in state
  const [inputVals, setInputVals] = useState(getStartObj(dataObj.parametersObj, dataObj.speciesObj[logisticType][speciesSelected]))
  const [animationOn, setAnimationOn] = useState(false)
  const [intervalID, setIntervalID] = useState(null)
  const [showVisual, setShowVisual] = useState(false)
  const [showTangent, setShowTangent] = useState(false)
  const [showGraphPopDensity, setShowGraphPopDensity] = useState(true);
  const [showGraphOther, setShowGraphOther] = useState(false)
  const [display, setDisplay] = useState("Population Density");
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setLogisticType('Continuous')
    if (dataSelect === "Exponential") {
      const species = Object.keys(Exponential.speciesObj.Continuous)[0]
      setDataObj(Exponential)
      setSpeciesSelected(species)
      setInputVals(getStartObj(Exponential.parametersObj, Exponential.speciesObj.Continuous[species]))
    } else if (dataSelect === "Logistic") {
      const species = Object.keys(Logistic.speciesObj.Continuous)[0]
      setDataObj(Logistic)
      setSpeciesSelected(Object.keys(Logistic.speciesObj.Continuous)[0])
      setInputVals(getStartObj(Logistic.parametersObj, Logistic.speciesObj.Continuous[species]))
    } else if (dataSelect === "LotkaVolterraCompetition") {
      const species = Object.keys(LotkaVolterraCompetition.speciesObj.Continuous)[0]
      setDataObj(LotkaVolterraCompetition)
      setSpeciesSelected(Object.keys(LotkaVolterraCompetition.speciesObj.Continuous)[0])
      setInputVals(getStartObj(LotkaVolterraCompetition.parametersObj, LotkaVolterraCompetition.speciesObj.Continuous[species]))
    } else if (dataSelect === "LotkaVolterraPredation") {
      const species = Object.keys(LotkaVolterraPredation.speciesObj.Continuous)[0]
      setDataObj(LotkaVolterraPredation)
      setSpeciesSelected(Object.keys(LotkaVolterraPredation.speciesObj.Continuous)[0])
      setInputVals(getStartObj(LotkaVolterraPredation.parametersObj, LotkaVolterraPredation.speciesObj.Continuous[species]))
    }
  }, [dataSelect])

  useEffect(() => {
    console.log(visualOutputRef)
    if (visualOutputRef.current) {
      setHeight(visualOutputRef.current.getBoundingClientRect().height)
      setWidth(visualOutputRef.current.getBoundingClientRect().width)
    }
  }, [display])

  const handleDataChange = (e) => {
    setDataSelect(e.value)
  }

  const handleDisplayChange = (e) => {
    console.log(e)
    setDisplay(e.value)
  }
  // generic change handler for input values
  const handleInputChange = (e) => {
    setInputVals(prevState => ({ ...prevState, [e.target.name]: parseFloat(e.target.value) }))
  };
  // click handler for animation button
  const handleAnimationToggle = () => {
    if (!animationOn) { startAnimation(200) }
    else if (animationOn) { clearAnimation() }
    setAnimationOn(!animationOn)
  }
  // click handler to turn on and off the display of the visual when button is clicked
  const handleVisualToggle = () => {
    setShowVisual(!showVisual)
  }
  // function for handling reset
  const handleReset = () => {
    // const speciesVals = dataObj.speciesObj[logisticType][speciesSelected].values
    // setInputVals({ ...speciesVals })
    setInputVals(getStartObj(dataObj.parametersObj, dataObj.speciesObj[logisticType][speciesSelected]))
  }
  const handleSpeciesChange = (e) => {
    setSpeciesSelected(e.value)
    const speciesVals = dataObj.speciesObj[logisticType][e.value].values
    setInputVals({ ...speciesVals })
  }
  const handleLogisticType = (e) => {
    setLogisticType(e.value)
    setSpeciesSelected(Object.keys(dataObj.speciesObj[e.value])[0])
  }
  const handleTangentSwitch = (e) => {
    setShowTangent(prevState => (!prevState))
  }
  const handleGraphShowPopDensity = () => {
    console.log('pop density clicked')
    setShowGraphPopDensity(prevState => (!prevState))
  }
  const handleGraphShowOther = () => {
    console.log('other clicked')
    setShowGraphOther(prevState => (!prevState))
  }
  // UTILITIES
  // function to start interval, assign it an id, and set it in state
  let iterativeVal = 0
  const startAnimation = (ms) => {
    setInputVals(prevState => ({ ...prevState, t: 0 }))
    if (!intervalID) { setIntervalID(setInterval(incrementX0, ms)) }
  }
  // function to clear interval and empty its id in state
  const clearAnimation = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  }
  // helper function that defines animation steps, and updates inputs values in states
  const incrementX0 = () => {
    iterativeVal += 1
    if (iterativeVal > dataObj.parametersObj.general.t.max) { iterativeVal = 0 }
    setInputVals(prevState => ({ ...prevState, t: iterativeVal.toFixed(2) }))
  }
  const formatNumber = (num, maxLength, index) => {
    const h = inputVals.tmax / 1000
    const adjNum = Array.isArray(num) ? parseFloat(num.slice(-1)[0][index]).toFixed(2) : num
    console.log(adjNum)
    console.log(adjNum)
    if (adjNum.toString().length > maxLength) {
      return Number.parseFloat(adjNum).toExponential(2)
    } else {
      return adjNum
    }
  }

  const getHeight = (ref) => {
    console.log(ref)
    return ref.offsetY
  }

  return (
    <div className="App" >
      <div className='data-select'>
        <Dropdown
          buttonContents={dataSelect}
          buttonClass={'data-select-btn'}
          onChange={handleDataChange}
          matchWidth='button'
          buttonWidth={'100%'}
        >
          <Dropdown.Option name='Exponential' selected='true'>Exponential</Dropdown.Option>
          <Dropdown.Option name='Logistic'>Logistic</Dropdown.Option>
          <Dropdown.Option name='LotkaVolterraCompetition'>LotkaVolterraCompetition</Dropdown.Option>
          <Dropdown.Option name='LotkaVolterraPredation'>LotkaVolterraPredation</Dropdown.Option>
        </Dropdown>
      </div>
      <Header logisticType={logisticType} header={dataObj.header} />
      <div className="general-pane">
        {/* {dataObj.modelSettings.usingDiscrete ?
          <Dropdown
            buttonContents={logisticType}
            onChange={handleLogisticType}
            buttonWidth={'100%'}
            // buttonClass={'logistic-type-dropdown-btn'}
            buttonId={'logistic-type-dropdown-btn'}
            matchWidth={'button'}
          >
            <Dropdown.Option name='Continuous' selected='true'>Continuous</Dropdown.Option>
            <Dropdown.Option name='Discrete'>Discrete</Dropdown.Option>
          </Dropdown>
          :
          null

        }
        <SpeciesDropdown
          speciesSelected={speciesSelected}
          handleSpeciesChange={handleSpeciesChange}
          speciesObj={dataObj.speciesObj[logisticType]}
          key={parseInt(dataObj.key) + (logisticType === "Continuous" ? 0 : 1)}
          dataSelect={dataSelect}
          logisticType={logisticType}
        /> */}
      </div>
      <div className="row" >
        <div className="col input-col">
          <div className="data-pane">
            <div className="input-grp">
              {dataObj.modelSettings.usingDiscrete ?
                <Dropdown
                  buttonContents={logisticType}
                  onChange={handleLogisticType}
                  buttonWidth={'100%'}
                  // buttonClass={'logistic-type-dropdown-btn'}
                  buttonId={'logistic-type-dropdown-btn'}
                  matchWidth={'button'}
                >
                  <Dropdown.Option name='Continuous' selected='true'>Continuous</Dropdown.Option>
                  <Dropdown.Option name='Discrete'>Discrete</Dropdown.Option>
                </Dropdown>
                :
                null

              }
              <SpeciesDropdown
                speciesSelected={speciesSelected}
                handleSpeciesChange={handleSpeciesChange}
                speciesObj={dataObj.speciesObj[logisticType]}
                key={parseInt(dataObj.key) + (logisticType === "Continuous" ? 0 : 1)}
                dataSelect={dataSelect}
                logisticType={logisticType}
              />
            </div>
            <div className="input-grp">
              <div className="general-pane">
                {Object.entries(dataObj.parametersObj.general).map(([key, value]) => (
                  value.show[logisticType] ?
                    <InputField
                      name={key}
                      max={value.max}
                      min={value.min}
                      step={value.step}
                      value={inputVals[key]}
                      handleInputChange={handleInputChange}
                      tooltipName={value.tooltipName}
                      tooltipText={value.tooltipText}
                    />
                    :
                    null
                ))}
              </div>
            </div>
            <div className={dataObj.parametersObj.species2 ? "input-grp-split" : "input-grp"}>
              <div className={dataObj.parametersObj.species2 ? 'species1-pane-split' : 'species1-pane'}>
                {dataObj.parametersObj.species2 ?
                  <h5 className='species-heading'>
                    {dataObj.speciesObj[logisticType][speciesSelected].name.species1}
                  </h5>
                  : null}
                {Object.entries(dataObj.parametersObj.species1).map(([key, value]) => (
                  value.show[logisticType] ?
                    <InputField
                      name={key}
                      max={value.max}
                      min={value.min}
                      step={value.step}
                      value={inputVals[key]}
                      handleInputChange={handleInputChange}
                      tooltipName={value.tooltipName}
                      tooltipText={value.tooltipText}
                    />
                    :
                    null
                ))}

                {dataObj.equationsObj.map((eq) => (
                  eq.displayOutput && (eq.logisticType === logisticType) && (!eq.isTangent || showTangent)
                    ?
                    <>
                      {eq.logisticType === logisticType ?
                        <OutputField
                          value={
                            formatNumber(eq.calc(inputVals.t, inputVals), 12, 0)}
                          tooltipName={eq.tooltipName}
                          tooltipText={eq.tooltipText}
                        />
                        :
                        null
                      }
                    </>
                    :
                    null
                ))
                }
              </div>
              {dataObj.parametersObj.species2 ?
                <div className='species2-pane-split'>
                  <h5 className='species-heading'>
                    {dataObj.speciesObj[logisticType][speciesSelected].name.species2}
                  </h5>
                  {Object.entries(dataObj.parametersObj.species2).map(([key, value]) => (
                    value.show[logisticType] ?
                      <InputField
                        name={key}
                        max={value.max}
                        min={value.min}
                        step={value.step}
                        value={inputVals[key]}
                        handleInputChange={handleInputChange}
                        tooltipName={value.tooltipName}
                        tooltipText={value.tooltipText}
                      />
                      :
                      null
                  ))}
                  {dataObj.equationsObj.map((eq) => (
                    eq.displayOutput ?
                      <>
                        {eq.logisticType === logisticType ?
                          <OutputField
                            value={
                              formatNumber(eq.calc(inputVals.t, inputVals), 12, 1)}
                            tooltipName={[<span>N<sub>t</sub></span>]}
                            tooltipText={[<span><em>N<sub>t</sub></em>: Ending population abundance</span>]}
                          />
                          :
                          <OutputField
                            value={
                              formatNumber(eq.calc(inputVals.t, inputVals), 12, 1)
                            }
                            tooltipName={[<span><em>dN/dt</em></span>]}
                            tooltipText={[<span><em>dN/dt</em>: instantaneous per capita rate of population growth</span>]}
                          />
                        }
                      </>
                      :
                      null
                  ))
                  }
                </div>
                :
                null
              }
              <div className='reset-btn-container'>
                <Button className='reset-btn'
                  variant="outline"
                  // color={'base'}
                  onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
            <div className='tangent-switch-container'>
              {dataSelect === 'Exponential' || (dataSelect === 'Logistic' && logisticType === "Continuous")
                ?
                <div className='switch-container'>
                  <Switch
                    labelClass='switch-label'
                    className='switch-btn'
                    label={[<span><em>dN/dt</em></span>]}
                    checked={false}
                    onToggle={handleTangentSwitch}
                  // key={dataObj.key}
                  />
                </div>
                :
                null
              }
              <div className='switch-container'>
                <Switch
                  labelClass='switch-label'
                  className='switch-btn'
                  label={[<span>Animation</span>]}
                  checked={false}
                  onToggle={handleAnimationToggle}
                // key={dataObj.key}
                />
              </div>
              {/* <Button className='control-btn'
              variant="outline"
              // color={'base'}
              onClick={handleReset}>
                Reset
              </Button> */}
              {/* {dataObj.equationsObj.map((element, index) => (
                element.alwaysShow ?
                  element.populationDensity ?
                    <div className='switch-container'>
                      <Switch
                        labelClass='switch-label'
                        className='switch-btn'
                        label={[<span>Population Density</span>]}
                        checked={true}
                        onToggle={handleGraphShowPopDensity}
                      // key={dataObj.key}
                      />
                    </div>
                    :
                    <div className='switch-container'>
                      <Switch
                        labelClass='switch-label'
                        className='switch-btn'
                        label={[<span>{element.name}</span>]}
                        // checked={graphshow}
                        onToggle={handleGraphShowOther}
                      // key={dataObj.key}
                      />
                    </div>
                  : null
              ))} */}
            </div>
            {/* <div className='switch-container'>
              <Switch
                labelClass='switch-label'
                className='switch-btn'
                label={[<span>Visual</span>]}
                checked={false}
                onToggle={handleVisualToggle}
              // key={dataObj.key}
              />
            </div> */}
          </div>
        </div>
        <div className='col'>
          <div className={dataObj.multipleCharts ? "chart-pane-split" : "chart-pane"}>
            {dataObj.multipleCharts ?
              <Dropdown
                buttonContents={display}
                buttonClass={'data-select-btn'}
                onChange={handleDisplayChange}
                matchWidth='button'
                buttonWidth={'100%'}
              >
                <Dropdown.Option name='chart1' selected='true'>Population Density</Dropdown.Option>
                <Dropdown.Option name='chart2'>Graph2</Dropdown.Option>
                <Dropdown.Option name='graphic'>Graphic</Dropdown.Option>
              </Dropdown>
              :
              <Dropdown
                buttonContents={display}
                buttonClass={'data-select-btn'}
                onChange={handleDisplayChange}
                matchWidth='button'
                buttonWidth={'100%'}
              >
                <Dropdown.Option name='chart1' selected='true'>Population Density</Dropdown.Option>
                <Dropdown.Option name='graphic'>Graphic</Dropdown.Option>
              </Dropdown>
            }
            {dataObj.multipleCharts ?
              <div className='line-chart-container'
              >
                <div style={display === 'Population Density' ? { display: 'block' } : { display: 'none' }}>
                  <ChartContainer
                    // style={showGraphPopDensity ? { display: 'block' } : { display: 'none' }}
                    inputVals={inputVals}
                    equationsObj={dataObj.equationsObj.filter(eq => eq.isRK)}
                    tMax={inputVals.tmax}
                    logisticType={logisticType}
                    speciesSettings={dataObj.speciesObj[logisticType][speciesSelected].settings}
                    graphOptions={dataObj.graphSettings}
                    multipleCharts={dataObj.multipleCharts}
                    key={1}
                    name={dataObj.speciesObj[logisticType][speciesSelected].name}
                    chartTitle={dataObj.chartTitle[1]}
                  />
                </div>
                <div style={display === 'Graph2' ? { display: 'block' } : { display: 'none' }}>
                  <ChartContainer
                    // style={showGraphOther ? { display: 'block' } : { display: 'none' }}
                    inputVals={inputVals}
                    equationsObj={dataObj.equationsObj.filter(eq => !eq.isRK)}
                    tMax={inputVals.tmax}
                    logisticType={logisticType}
                    speciesSettings={dataObj.speciesObj[logisticType][speciesSelected].settings}
                    graphOptions={dataObj.graphSettings}
                    multipleCharts={dataObj.multipleCharts}
                    key={2}
                    name={dataObj.speciesObj[logisticType][speciesSelected].name}
                    chartTitle={dataObj.chartTitle[0]}
                  />
                </div>
              </div>
              :
              <div style={display === 'Population Density' ? { display: 'block' } : { display: 'none' }}>
                <ChartContainer
                  inputVals={inputVals}
                  equationsObj={dataObj.equationsObj}
                  tMax={dataObj.parametersObj.general.t.max}
                  logisticType={logisticType}
                  speciesSettings={dataObj.speciesObj[logisticType][speciesSelected].settings}
                  graphOptions={dataObj.graphSettings}
                  multipleCharts={dataObj.multipleCharts}
                  key={0}
                  showTangent={showTangent}
                  name={dataObj.speciesObj[logisticType][speciesSelected].name}
                  chartTitle={dataObj.chartTitle}
                />
              </div>
            }
            {display === 'Graphic' ?
              <div className='visual-container' ref={visualOutputRef}>
                <div className={'animation-div'}>
                  <VisualOutput
                    nValue={
                      dataObj.equationsObj.filter(eq => eq.displayOutput).filter(eq => eq.logisticType === logisticType)[0].calc(inputVals.t, inputVals)
                    }
                    species={speciesSelected}
                    emoji={dataObj.speciesObj[logisticType][speciesSelected].emoji}
                    height={height}
                    width={width}
                  />
                </div>
              </div>
              :
              null
            }
          </div>
        </div>
      </div>
      <div className='data-pane2'>
        <div className='btn-container2'>
          {/* <Button className='control-btn' variant="solid" color={'base'} onClick={handleAnimationToggle}>
            {!animationOn ? 'Start Animation' : 'Stop Animation'}
          </Button> */}
          {/* <Button className='control-btn' variant="solid" color={'base'} onClick={handleVisualToggle}>
            {!showVisual ? 'Show Visual' : 'Hide Visual'}
          </Button> */}
          {/* <Button className='control-btn' variant="solid" color={'base'} onClick={handleReset}>
            Reset
          </Button> */}
        </div>
      </div>
    </div >
  );
}

export default App;
