import {
    AUTH_USER,
    LOGOUT_USER,
    MODIFYING_USER,
    REGISTER_USER,
    TYPE_USER,
    SEND_USER_PROFILE,
    SEND_USER_NAME,
} from "../_action/types";

export default function userReducer(state, action) {
    switch (action.type) {
        case TYPE_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload };
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };
        case SEND_USER_NAME:
            return { ...state, uploadNameSuccess: action.payload };
        case SEND_USER_PROFILE:
            return { ...state, uploadProfileSuccess: action.payload };
        default:
            return "";
    }
}
