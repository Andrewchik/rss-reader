import { openFailure, openSuccess } from "../actions/actionCreators/authModal.action-creators";
import { OPEN_SUCCESS, OPEN_FAILURE } from "../actions/actionTypes/authModal.action-types";

type AuthState = {
    isModalOpen: boolean;
  };
  
  type AuthAction = ReturnType<typeof openFailure | typeof openSuccess>;
  
  const initialState: AuthState = {
    isModalOpen: false,
  };
  
  const authModal = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case OPEN_SUCCESS:
        return {
          ...state,
          isModalOpen: true,
        };
      case OPEN_FAILURE:
        return {
          ...state,
          isModalOpen: false,
        };
      default:
        return state;
    }
  };
  
  export default authModal;