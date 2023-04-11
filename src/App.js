import { useState, useEffect } from "react";
import './App.css';
// DATA
// import { parametersObj, dataObj.speciesObj, equationsObj, graphSettings } from './utils/Data';
import Logistic from './utils/Data_logistic';
import Exponential from './utils/Data_exponential'
import LotkaVolterraCompetition from "./utils/Data_lotka-volterra-competition";
// NORTON DESIGN SYSTEM
import { Button, Dropdown } from '@wwnds/react';
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
    }
  }, [dataSelect])

  const handleDataChange = (e) => {
    setDataSelect(e.value)
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
    if (iterativeVal > dataObj.parametersObj.t.max) { iterativeVal = 0 }
    setInputVals(prevState => ({ ...prevState, t: iterativeVal.toFixed(2) }))
  }
  const formatNumber = (num, maxLength) => {
    if (num.toString().length > maxLength) {
      return Number.parseFloat(num).toExponential(2)
    } else {
      return num
    }
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
        </Dropdown>
      </div>
      <Header logisticType={logisticType} header={dataObj.header} />
      <div className="data-pane">
        {dataObj.modelSettings.usingDiscrete ?
          <Dropdown
            buttonContents={logisticType}
            onChange={handleLogisticType}
            buttonWidth={'100%'}
          >
            <Dropdown.Option name='Continuous' selected='true'>Continuous</Dropdown.Option>
            <Dropdown.Option name='Discrete'>Discrete</Dropdown.Option>
          </Dropdown>
          :
          null
        }
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
              <h5 className='species-heading'>Species1</h5>
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
            <OutputField
              value={logisticType === 'Continuous' ?
                formatNumber(dataObj.equationsObj.Continuous.calc(inputVals.t, inputVals), 8)
                :
                formatNumber(dataObj.equationsObj.Discrete.calc(inputVals.t, inputVals), 8)}
              tooltipName={[<span>N<sub>t</sub></span>]}
              tooltipText={[<span><em>N<sub>t</sub></em>: Ending population abundance</span>]}
            />
            {logisticType === 'Continuous' ?
              <OutputField
                value={
                  formatNumber(dataObj.equationsObj.calcM.calc(inputVals.t, inputVals), 8)}
                tooltipName={[<span><em>dN/dt</em></span>]}
                tooltipText={[<span><em>dN/dt</em>: instantaneous per capita rate of population growth</span>]}
              />
              :
              null
            }
          </div>
          {dataObj.parametersObj.species2 ?
            <div className='species2-pane-split'>
              <h5 className='species-heading'>Species2</h5>
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
              <OutputField
                value={logisticType === 'Continuous' ?
                  formatNumber(dataObj.equationsObj.Continuous.calc(inputVals.t, inputVals), 8)
                  :
                  formatNumber(dataObj.equationsObj.Discrete.calc(inputVals.t, inputVals), 8)}
                tooltipName={[<span>N<sub>t</sub></span>]}
                tooltipText={[<span><em>N<sub>t</sub></em>: Ending population abundance</span>]}
              />
              {logisticType === 'Continuous' ?
                <OutputField
                  value={
                    formatNumber(dataObj.equationsObj.calcM.calc(inputVals.t, inputVals), 8)}
                  tooltipName={[<span><em>dN/dt</em></span>]}
                  tooltipText={[<span><em>dN/dt</em>: instantaneous per capita rate of population growth</span>]}
                />
                :
                null
              }
            </div>
            :
            null
          }
        </div>
      </div>
      <div className='data-pane2'>
        <div className='btn-container2'>
          <Button className='control-btn' variant="solid" color={'base'} onClick={handleAnimationToggle}>
            {!animationOn ? 'Start Animation' : 'Stop Animation'}
          </Button>
          <Button className='control-btn' variant="solid" color={'base'} onClick={handleVisualToggle}>
            {!showVisual ? 'Show Visual' : 'Hide Visual'}
          </Button>
          <Button className='control-btn' variant="solid" color={'base'} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="chart-pane">
        <SpeciesDropdown
          speciesSelected={speciesSelected}
          handleSpeciesChange={handleSpeciesChange}
          speciesObj={dataObj.speciesObj[logisticType]}
          key={parseInt(dataObj.key) + (logisticType === "Continuous" ? 0 : 1)}
          dataSelect={dataSelect}
          logisticType={logisticType}
        />
        {showVisual ?
          <div className='visual-container'>
            <div className={'animation-div'}>
              <VisualOutput
                nValue={logisticType === "Continuous" ?
                  dataObj.equationsObj.Continuous.calc(inputVals.t, inputVals)
                  :
                  dataObj.equationsObj.Discrete.calc(inputVals.t, inputVals)}
                species={speciesSelected}
                emoji={dataObj.speciesObj[logisticType][speciesSelected].emoji}
              />
            </div>
          </div>
          :
          null
        }
        <ChartContainer
          inputVals={inputVals}
          equationsObj={dataObj.equationsObj}
          tMax={dataObj.parametersObj.general.t.max}
          logisticType={logisticType}
          speciesSettings={dataObj.speciesObj[logisticType][speciesSelected].settings}
          graphOptions={dataObj.graphSettings}
        />
      </div>
    </div >
  );
}

export default App;
