import React from 'react';
import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import PageDetails from '../src/components/page-details';


test('should match snapshot', () => {
  const title = 'vera';
  const {container} = render(<Provider store={store}><PageDetails title={title} publishedAt="000test000"/></Provider>);
  expect(container).toMatchSnapshot();
})
test('should call useEffect', () => {
  const title = 'vera';
  const spy = jest.spyOn(React, "useEffect");
  render(<Provider store={store}><PageDetails title={title} publishedAt="000test000"/></Provider>);
  expect(spy).toBeCalled();
})
test('should show title on the page', () => {
  const title = 'vera';
  const {getByText} = render(<Provider store={store}><PageDetails title={title} publishedAt="000test000"/></Provider>);
  expect(getByText(/loading/i)).toBeTruthy();
})

