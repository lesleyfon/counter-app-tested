// Configuring enzyme in the test file
import React from 'react';
import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import { createStore } from "redux";

//Component
import Component from "./Component";
import reducer from "./reducer";

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
});
