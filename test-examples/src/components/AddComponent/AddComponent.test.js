import React from "react";
import { render } from 'enzyme';
import { AddComponent } from './AddComponent';
import { addFunc } from './AddComponent';

describe('render AddComponent', () => {
    const component = render(<AddComponent/>);

    it('to match snapshot', () => {
        expect(component).toMatchSnapshot();
    })
})

describe('test add function', () => {
    it('add function', () => {
        expect(addFunc(2, 3)).toBe(5);
    })
});
