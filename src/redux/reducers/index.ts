import { combineReducers } from 'redux';

import auth from "./auth.reducer";
import authModal from "./authModal.reducer";

const reducers = combineReducers({
    auth,
    authModal,
});

export { reducers };