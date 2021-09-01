const initialState = {
  articles: [],
  error: {
    err: false, 
    errMessage: '',
  },
};
function reducer(state = initialState, action): any  {
  switch (action.type) {
    case 'GET_ARTICLES':
      return { ...state, articles: action.articles }
    case 'GET_ERRORS':
      return { ...state, error: {
        err: true,
        errMessage: action.error.errMessage,
      } }
    default:
      return state
  }
}
export default reducer;