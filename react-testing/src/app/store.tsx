import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

export interface RootState {
  articles: [],
  error: {
    err: false, 
    errMessage: '',
  },
}

const store = createStore(
  reducer,
  composeWithDevTools(),
);
export default store;