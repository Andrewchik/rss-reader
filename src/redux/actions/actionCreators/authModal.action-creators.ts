import { OPEN_SUCCESS, OPEN_FAILURE } from "../actionTypes/authModal.action-types";

export const openSuccess = () => ({
    type: OPEN_SUCCESS,
  });
  
  export const openFailure = () => ({
    type: OPEN_FAILURE,
  });