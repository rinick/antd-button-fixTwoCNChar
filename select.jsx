import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Checkbox, Select} from 'antd';

const callbacks = new Set();

const AsyncSelect = (props) => {
    const [init, setInit] = useState(false);
    if (init) {
        return <Select/>
    } else {
        // simulate async data
        callbacks.add(setInit);
        return <div/>
    }
};

const App = (psops) => {
    const [show, setShow] = useState(false);

    const onChange = e => {
        setShow(!show);
    };

    let children = [];
    if (show) {
        for (let i = 0; i < 425; ++i) {
            children.push(<AsyncSelect key={i}/>);
        }
        callbacks.clear();
        // simulate async data loading
        setTimeout(() => {
            for (let callback of callbacks) {
                callback(true);
            }
        }, 10)
    }

    return (
        <div style={{width: 800, margin: 20, position: 'absolute'}}>
            <Checkbox onChange={onChange}>Show the page</Checkbox>
            <br/>
            {children}
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
);