import reducer, {initialState} from '../src/app/reducer';

test('should return default state', () => {
  expect(reducer(initialState, {})).toBe(initialState);
})

test('should set error', () => {
  const action = {type: 'GET_ERRORS', error: {err: true, errMessage: 'Error'}};
  expect(reducer(initialState, action).error.errMessage).toBe('Error');
})