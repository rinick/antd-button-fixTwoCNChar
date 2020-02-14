import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {Radio, Checkbox, Select, Button, Input} from 'antd';

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
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
        </Select>,
    checkbox:
        <Checkbox style={{width: 80}}>Check</Checkbox>,
    input:
        <Input style={{width: 80}}/>
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

        changeTime = new Date().getTime();
        for (let callback of callbacks) {
            callback(component);
        }
        window.requestAnimationFrame(onChangeEnd);
    });

    let children = [];
    for (let i = 0; i < 400; ++i) {
        children.push(<AsyncComponent key={i}/>);
    }


    return (
        <div style={{width: 810, margin: 20, position: 'absolute'}}>
            Select component to render asynchronously (
            from {lastComp} to {currentComp} : {changeEndTime - changeTime} ms )<br/>
            <Radio.Group defaultValue='none' onChange={onChange}>
                <Radio value='none'>None</Radio>
                <Radio value='button'>Button</Radio>
                <Radio value='select'>Select</Radio>
                <Radio value='checkbox'>CheckBox</Radio>
                <Radio value='input'>Input</Radio>
            </Radio.Group>
            <br/>
            {children}
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
);
