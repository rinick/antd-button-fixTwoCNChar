import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Checkbox, Select, Slider, Button, Input} from 'antd';

const {Option} = Select;
let k = 0;
const App = (psops) => {
  const [show, setShow] = useState(false);

  const onChange = e => {
    setShow(!show);
  };

  let children = [];
  if (show) {
    for (let i = 0; i < 100; ++i) {
      children.push(
        <span key={i}>
          <Button>{i}</Button>
          <Select style={{width: 80}}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
           <Input.Search style={{width: 100}}/>
          <Slider style={{width: 100}}/>
        </span>);
    }
  }

  return (
    <div style={{width: 900, height: 800, margin: 20}}>
      <Checkbox onChange={onChange}>Show the page</Checkbox>
      <br/>
      {children}
    </div>
  )
};

ReactDOM.render(
  <App/>
  ,
  document.querySelector('#app')
);