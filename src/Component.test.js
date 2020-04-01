// Configuring enzyme in the test file
import React from 'react';
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore } from "redux";

//Component
import Component from "./Component";
import reducer from "./reducer";
import { addCount } from './actions';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("Mount <Component />", () => {
  //creating a mock for redux store
  const mockStore = createStore(reducer, {
    count: 0
  });

  const getWrapper = () => mount(
    <Provider store={mockStore}>
      <Component />
    </Provider>
  );

  test('should add to count and display the correct # of counts ', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('h3').text()).toEqual('Count: 0')
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('h3').text()).toEqual('Count: 2')
    
  });
  
  it('should dispatch the correct action on button click', () => {
    const mockStore = createStore(reducer, { count: 0 });
    mockStore.dispatch = jest.fn();

    const wrapper = getWrapper(mockStore);
    wrapper.find('button').simulate('click');
    mockStore.dispatch(addCount());
    expect(mockStore.dispatch).toHaveBeenCalledWith({type:  'ADD_COUNT_TYPE'});
  });
 
  
  
});
