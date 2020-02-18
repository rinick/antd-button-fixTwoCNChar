import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from '@material-ui/core/Radio';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const callbacks = new Set();

const AsyncComponent = (props) => {
  const [component, setComponent] = useState(false);
  if (component) {
    return component;
  } else {
    // simulate async data
    callbacks.add(setComponent);
    return <div/>
  }
};

const components = {
  button:
    <Button style={{width: 80}}>Button</Button>,
  select:
    <Select defaultValue="lucy" style={{width: 80}}>
      <MenuItem value="jack">Jack</MenuItem>
      <MenuItem value="lucy">Lucy</MenuItem>
    </Select>,
  checkbox:
    <FormControlLabel control={<Checkbox/>} label="Check"/>,
  input:
    <Input style={{width: 80}}/>,
  slider:
    <Slider style={{width: 80, display: 'inline-block'}}/>,
  date:
    <KeyboardDatePicker
      format="fullDate"
      style={{width: 80}}/>,
  switch:
    <Switch style={{width: 80}}/>,
  tooltip:
    <Tooltip title="Tooltip">
      <span style={{width: 80, display: 'inline-block'}}>Hover me</span>
    </Tooltip>,
};

let changeTime = 0;
let changeEndTime = 0;
let lastComp = 'none';
let currentComp = 'none';
const App = (psops) => {

  const [u, forceUpdate] = useState(1);

  const onChangeEnd = useCallback((e) => {
    let t = new Date().getTime();
    if (changeEndTime < changeTime || t - changeEndTime > 20) {
      changeEndTime = t;
      window.requestAnimationFrame(onChangeEnd);
    } else {
      forceUpdate(-u);
    }

  });
  const onChange = useCallback((e) => {
    lastComp = currentComp;
    currentComp = e.target.value;
    let component = components[currentComp];

    setTimeout(() => {
      changeTime = new Date().getTime();
      for (let callback of callbacks) {
        callback(component);
      }
      window.requestAnimationFrame(onChangeEnd);
    })
  });

  let children = [];
  for (let i = 0; i < 400; ++i) {
    children.push(<AsyncComponent key={i}/>);
  }


  return (
    <div style={{width: 810, margin: 20, position: 'absolute'}}>
      Select component to render asynchronously (
      from {lastComp} to {currentComp} : {changeEndTime - changeTime} ms )<br/>
      <RadioGroup onChange={onChange} row>
        <FormControlLabel value='none' control={<Radio/>} label="None"/>
        <FormControlLabel value='button' control={<Radio/>} label="Button"/>
        <FormControlLabel value='select' control={<Radio/>} label="Select"/>
        <FormControlLabel value='checkbox' control={<Radio/>} label="CheckBox"/>
        <FormControlLabel value='input' control={<Radio/>} label="Input"/>
        <FormControlLabel value='slider' control={<Radio/>} label="Slider"/>
        <FormControlLabel value='date' control={<Radio/>} label="Date"/>
        <FormControlLabel value='switch' control={<Radio/>} label="Switch"/>
        <FormControlLabel value='tooltip' control={<Radio/>} label="Tooltip"/>
      </RadioGroup>
      <br/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </div>
  )
};

ReactDOM.render(
  <App/>,
  document.querySelector('#app')
);
