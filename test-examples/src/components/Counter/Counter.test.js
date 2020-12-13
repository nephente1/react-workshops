
import { shallow, render } from 'enzyme';
import { Counter } from './Counter';

describe('render Counter Component', () => {
    it('should render', () => {
        const component = render(<Counter />);
        expect(component).toHaveLength(1);
    })
});

describe('Counter component', () => {

    it('Counter should have default value Licznik: 0, even without passed props', () => {
        const component = shallow(<Counter/>);
        const valueInH3 = component.find('h3');
        expect(valueInH3.text()).toBe('Licznik: 0');
    })

    it('Counter should have value 10 if props `start` is 10', () => {
        const props = {
            start: 10
        }
        const component = shallow(<Counter {...props}/>);
        expect(component.find('h3 span').text()).toEqual('10');
    })

    it('Counter should have addButton', () => {
        const component = shallow(<Counter />);
        const addButton = component.find('button[data-test="addButton"]');
        expect(addButton).toHaveLength(1)
    })

    it('Counter should have decrementButton', () => {
        const component = shallow(<Counter />);
        const decrementButton = component.find('button[data-test="decrementButton"]');
        expect(decrementButton).toHaveLength(1)
    })

    it('Counter should have resetButton', () => {
        const component = shallow(<Counter />);
        const decrementButton = component.find('button[data-test="resetButton"]');
        expect(decrementButton).toHaveLength(1)
    })

    it('Counter should have changeButton', () => {
        const component = shallow(<Counter />);
        const decrementButton = component.find('button[data-test="changeButton"]');
        expect(decrementButton).toHaveLength(1)
    })

    it('Counter should increment value +1 after click addButton', () => {
        const props = {
            start: 0
        }
        const component = shallow(<Counter {...props}/>);
        let counterVal = component.find('h3 span');
        const addButton = component.find('button[data-test="addButton"]');
        expect(counterVal.text()).toBe('0');
        addButton.simulate('click');
        counterVal = component.find('h3 span');
        expect(counterVal.text()).toBe('1');
    })

    it('Counter should decrement value -1 after click decrementButton', () => {
        const props = {
            start: 0
        }
        const component = shallow(<Counter {...props}/>);
        let counterVal = component.find('h3 span');
        const decrementButton = component.find('button[data-test="decrementButton"]');
        expect(counterVal.text()).toBe('0');
        decrementButton.simulate('click');
        counterVal = component.find('h3 span');
        expect(counterVal.text()).toBe('-1');
    })

    it('Clicked change button should change value to the value typed in input', () => {
        const component = shallow(<Counter />);
        const input = component.find('input');
        const changeButton = component.find('button[data-test="changeButton"]');
        let counterVal = component.find('h2 span');

        input.simulate('change', { target: { value: '10' } });
        changeButton.simulate('click');

        counterVal = component.find('h2 span');
        expect(counterVal.text()).toBe('10');
    })

    it('click reset button should reset the start value', () => {
        const props = {
            start: 0
        }
        const component = shallow(<Counter {...props} />);
        const resetButton = component.find('button[data-test="resetButton"]');
        let counterVal = component.find('h2 span');

        resetButton.simulate('click');
        counterVal = component.find('h2 span');
        expect(counterVal.text()).toBe('0');
    })


})

