import { LOGIN_SUCCESS, LOGIN_FAILURE, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE } from "../actionTypes/auth.action-types";

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
  });
  
  export const loginFailure = () => ({
    type: LOGIN_FAILURE,
  });
  
  export const checkAuthSuccess = () => ({
    type: CHECK_AUTH_SUCCESS,
  });
  
  export const checkAuthFailure = () => ({
    type: CHECK_AUTH_FAILURE,
  });