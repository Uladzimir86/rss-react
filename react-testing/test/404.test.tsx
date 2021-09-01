import React from 'react';
import {render, screen} from '@testing-library/react';
import Page404 from '../src/components/404';

test('should render Page404', () => {
  render(<Page404 />);
  expect(screen.getByText('404')).toBeTruthy();
})