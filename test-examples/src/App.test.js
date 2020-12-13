
import { render, screen } from '@testing-library/react';
import { shallow, mount, enzyme } from 'enzyme';
import App from './App';
import { Counter } from './components/Counter/Counter';

describe('<App><Counter /></App>', () => {
  const wrapper = shallow((<App />));
  it('renders Counter in App', () => {
    expect(wrapper.find(Counter)).toHaveLength(1);
  })

  it('Snapshot app.js', () => {
      expect(wrapper).toMatchSnapshot();
  });

});
