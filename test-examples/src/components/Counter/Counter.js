import React from 'react';

export const Counter = (props) => {
    const startCounter = props.start !== undefined ? props.start : 0;
    const [value, setValue] = React.useState(props.start);
    const [counter, setCounter] = React.useState(startCounter);

    const handleAdd = () => {
        setCounter(Number(counter)+1);
    }

    const handleSubtract = () => {
        setCounter(counter-1);
    }

    const handleReset = () => {
        setCounter(props.start);
        setValue(props.start);
    }

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    }

    const changeStartValue = () => {
        setCounter(value)
    }

    return(
        <div>
            <h2>Wartość początkowa licznika: <span>{value}</span></h2>
            <h3>Licznik: <span>{counter}</span></h3>
            <input onChange={handleChange} type="number" value={value} placeholder='type start number'/>
            <button data-test='changeButton' onClick={changeStartValue}>zmień</button>
            <button data-test='addButton' onClick={handleAdd}>+</button>
            <button data-test='decrementButton' onClick={handleSubtract}>-</button>
            <button data-test='resetButton' onClick={handleReset}>reset</button>
        </div>
    )
}
