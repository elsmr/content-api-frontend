import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as user } from '../redux/modules/user';
import Root from '../containers/Root';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<Root />', () => {
  it('renders with default props', () => {
    const store = mockStore({ user });
    const wrapper = shallow(
      <Root store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
