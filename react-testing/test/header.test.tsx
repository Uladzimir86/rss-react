import React from 'react';
import {render as rtlRender, screen} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import { Provider } from 'react-redux';
import store from '../src/app/store';
import Header from '../src/components/header';


const render = (ui: any, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return rtlRender(ui, {wrapper: Router})
}
const spy = jest.spyOn(React, 'useState');

test('should match snapshot', () => {
  const {container} = render(<Provider store={store}><Header/></Provider>);
  expect(container).toMatchSnapshot();
})
test('should set chosen link (/about)', () => {
  const route = '/about';
  render(<Header />, {route});
  expect(spy).toBeCalled();
})
test('should set chosen link (/details/)', () => {
  const route = '/details/';
  render(<Header />, {route});
  expect(spy).toBeCalled();
})
test('should set chosen link (/404)', () => {
  const route = '/404';
  render(<Header />, {route});
  expect(spy).toBeCalled();
})
 


