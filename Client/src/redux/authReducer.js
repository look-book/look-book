import { AUTH, LOGOUT } from '../constants/userConstansts';
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('token', JSON.stringify({ ...action?.payload }));
      return { ...state, token: action.payload };

    case LOGOUT:
      return { ...state, token: null };

    default:
      return state;
  }
};
