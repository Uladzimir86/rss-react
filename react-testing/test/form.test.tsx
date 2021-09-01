import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import Form from '../src/components/form';
import {getArticles, getErrors} from '../src/app/actions';

test('should match snapshot', () => {
  const {container} = render(<Provider store={store}><Form /></Provider>);
  expect(container).toMatchSnapshot();
})
test('should show text: ...enter letters...', async () => {
  render(<Provider store={store}><Form /></Provider>);
  const form = document.querySelector('.form');
  if (form) fireEvent.submit(form);
  await waitFor(() => {
    expect(screen.getByText(/enter letters/)).toBeTruthy();
  })
})

test('should not change Page Number', async () => {
  render(<Provider store={store}><Form /></Provider>);
  const btnLeft = screen.getByText('<');
  const btnRight = screen.getByText('>');
  const input = screen.getByTestId('pageNumber') as HTMLInputElement;
  fireEvent.click(btnLeft);
  await waitFor(() => {
    expect(input.value).toBe('1 / 1');
  })
  fireEvent.click(btnRight);
  await waitFor(() => {
    expect(input.value).toBe('1 / 1');
  })
})

test('should call setSearch',  async () => {
  const setSearch: any = jest.spyOn(React, 'useState');
  setSearch.mockImplementation((search: string) => [search, setSearch]);
  render(<Provider store={store}><Form /></Provider>);
  const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
  fireEvent.change(input, {target: {value: 'a'}});
  await waitFor(() => {
    expect(setSearch).toHaveBeenCalled();
   })
})

test('should call ResultsPerPage', () => {
  const setSort: any = jest.spyOn(React, 'useState');
  setSort.mockImplementation((sort: string) => [sort, setSort]);
  render(<Provider store={store}><Form /></Provider>);
  const select = screen.getByRole('combobox');
  fireEvent.change(select);
  expect(setSort).toHaveBeenCalled();
})

test('should call popularity sort', async () => {
  const setSort: any = jest.spyOn(React, 'useState');
  setSort.mockImplementation((sort: string) => [sort, setSort]);
  render(<Provider store={store}><Form /></Provider>);
  const popBtn = screen.getByText('Popularity');
  fireEvent.click(popBtn);
  await waitFor(() => {
    expect(setSort).toHaveBeenCalled();
    expect(setSort).toHaveBeenCalledWith('popularity');
  })
})

test('should call relevancy sort', async () => {
  const setSort: any = jest.spyOn(React, 'useState');
  setSort.mockImplementation((sort: string) => [sort, setSort]);
  render(<Provider store={store}><Form /></Provider>)
  const popBtn = screen.getByText('Relevancy');
  fireEvent.click(popBtn);
  await waitFor(() => {
    expect(setSort).toHaveBeenCalled();
    expect(setSort).toHaveBeenCalledWith('relevancy');
  })
})

test('should call publishedAt sort', async () => {
  const setSort: any = jest.spyOn(React, 'useState');
  setSort.mockImplementation((sort: string) => [sort, setSort]);
  render(<Provider store={store}><Form /></Provider>)
  const popBtn = screen.getByText('Published at');
  fireEvent.click(popBtn);
  await waitFor(() => {
    expect(setSort).toHaveBeenCalled();
    expect(setSort).toHaveBeenCalledWith('publishedAt');
  })
})


test('should call getArticles', () => {
  const mockFn = jest.fn(() => getArticles([]));
  const result = mockFn();
    expect(mockFn).toHaveBeenCalled();
    expect(result.type).toBe('GET_ARTICLES');
})

test('should call getErrors', () => {
  const mockFn = jest.fn(() => getErrors({err: false, errMessage: 'error'}));
  const result = mockFn();
    expect(mockFn).toHaveBeenCalled();
    expect(result.type).toBe('GET_ERRORS');
})
