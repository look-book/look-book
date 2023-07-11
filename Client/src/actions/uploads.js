import { FETCH_ALL, CREATE, UPDATE, DELETE, LOVE, HAPPY, SAD, SCARED, ANGRY } from '../constants/actionTypes';

import * as api from '../api/upload.js';

export const getUploads = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUploads();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUpload = (upload) => async (dispatch) => {
  
  try {
    const { data } = await api.createUpload(upload);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUpload = (id, upload) => async (dispatch) => {
  try {
    
    const { data } = await api.updateUpload(id, upload);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const loveUpload = (id) => async (dispatch) => {
  try {
    const { data } = await api.loveUpload(id);

    dispatch({ type: LOVE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const happyUpload = (id) => async (dispatch) => {
    try {
      const { data } = await api.happyUpload(id);
  
      dispatch({ type: HAPPY, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const sadUpload = (id) => async (dispatch) => {
    try {
      const { data } = await api.sadUpload(id);
  
      dispatch({ type: SAD, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const scaredUpload = (id) => async (dispatch) => {
    try {
      const { data } = await api.scaredUpload(id);
  
      dispatch({ type: SCARED, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const angryUpload = (id) => async (dispatch) => {
    try {
      const { data } = await api.angryUpload(id);
  
      dispatch({ type: ANGRY, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deleteUpload = (id) => async (dispatch) => {
  try {
    
    await api.deleteUpload(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};