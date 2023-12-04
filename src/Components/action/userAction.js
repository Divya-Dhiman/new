import * as actionTypes from './userActionType'
import axios from 'axios';

const fetchDataRequest = () => ({
  type: actionTypes.FETCH_DATA_REQUEST,
});

const fetchDataSuccess = (data,totalPages) => ({
  type: actionTypes.FETCH_DATA_SUCCESS,
  payload: {data,totalPages}
});

const fetchDataFailure = (error) => ({
  type: actionTypes.FETCH_DATA_FAILURE,
  payload: error,
});

const submitFormSuccess = (data) => ({
  type: actionTypes.SUBMIT_FORM_SUCCESS,
  payload: data,
});

const submitFormFailure = (error) => ({
  type: actionTypes.SUBMIT_FORM_FAILURE,
  payload: error,
});

const updateUserRequest = () => ({
  type: actionTypes.UPDATE_USER_REQUEST,
});

const updateUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  payload: data,
  
  
});

const updateUserFailure = (error) => ({
  type: actionTypes.UPDATE_USER_FAILURE,
  payload: error,
});

export const deleteUserRequest = () => ({
  type: actionTypes.DELETE_USER_REQUEST,
});

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
  type: actionTypes.DELETE_USER_FAILURE,
  payload: error,
});

export const fetchData = (searchTerm,itemsPerPage,currentPage,sortColumn,sortOrder) => {
  return (dispatch) => {

    
        dispatch(fetchDataRequest());
        const token = localStorage.getItem('accessToken'); 
        console.log('ddd',token)
    axios
      .get(`http://localhost:3001/users/getUsers`, {
        params: {
                   searchTerm,
                   currentPage,
                   itemsPerPage,
                  sortColumn,
                  sortOrder,
                },
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
      })
      .then((response) => {
        const { data,total} = response.data;
        const totalPages = Math.ceil(total / itemsPerPage);
        dispatch(fetchDataSuccess(data, totalPages));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

export const submitForm = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/users/createUser', formData);
      dispatch(submitFormSuccess(response.data));
    } catch (error) {
      dispatch(submitFormFailure(error));
    }
  };
};

export const updateUser = (id, formData) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response = await axios.put(`http://localhost:3001/users/updateUser/${id}`, formData);
      dispatch(updateUserSuccess(response.data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
};


export const deleteUser = (userId) => async (dispatch) => {
  return async (dispatch) => {
  dispatch(deleteUserRequest());

  try {
    await axios.delete(`http://localhost:3001/users/deleteUser/${userId}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};
}