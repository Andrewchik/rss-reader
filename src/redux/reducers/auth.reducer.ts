import { checkAuthFailure, checkAuthSuccess, loginFailure, loginSuccess } from "../actions/actionCreators/auth.action-creators";
import { CHECK_AUTH_FAILURE, CHECK_AUTH_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions/actionTypes/auth.action-types";

type AuthState = {
    isLoggedIn: boolean;
  };
  
  type AuthAction = ReturnType<typeof loginSuccess | typeof loginFailure | typeof checkAuthSuccess | typeof checkAuthFailure>;
  
  const initialState: AuthState = {
    isLoggedIn: false,
  };
  
  const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isLoggedIn: false,
        };
      case CHECK_AUTH_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
        };
      case CHECK_AUTH_FAILURE:
        return {
          ...state,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;