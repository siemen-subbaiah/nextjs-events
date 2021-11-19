export const initialState = {
  user: null,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_PERSISTENCE':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_NULL':
      return {
        ...state,
        user: null,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
