import { combineReducers } from "redux";
import userReducer from "../_reducer/userReducer";
import userFileReducer from "../_reducer/userFileReducer";
import userCartReducer from "../_reducer/userCartReducer";
//! combineReducers은 각 state에 관한 리듀서를 통합해주는 곳.

const rootReducer = combineReducers({
    userReducer,
    userFileReducer,
});

export default rootReducer;
