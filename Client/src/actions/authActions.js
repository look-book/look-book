import axios from 'axios';
import { AUTH, LOGOUT } from '../constants/userConstansts';

export const login = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/login', form, config);

    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (form) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/register', form, config);

    dispatch({
      type: AUTH,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (form) => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('token');
  document.location.href = '/';
};
