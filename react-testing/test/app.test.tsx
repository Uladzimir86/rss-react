import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import App from '../src/components/app';


test('should match snapshot', () => {
  const {container} = render(<Provider store={store}><App /></Provider>);
  expect(container).toMatchSnapshot();
})
test('full app rendering/navigating', async () => {
  render(<Provider store={store}><App /></Provider>);
  expect(screen.getByRole('table')).toBeTruthy();
  fireEvent.click(screen.getByText(/about/i))
  expect(screen.getByText(/Постановка целей является первым шагом/i)).toBeTruthy()
})