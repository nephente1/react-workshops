import React from 'react';

export const addFunc = (a, b) => {
    return a + b;
}

export const AddComponent = () => {
    return(
        <div>
            <h2>function add</h2>
            <h3>{ addFunc(2, 3) }</h3>
        </div>
    )
}
