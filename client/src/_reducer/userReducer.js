import {
    AUTH_USER,
    LOGOUT_USER,
    REGISTER_USER,
    TYPE_USER,
    SEND_USER_PROFILE,
    SEND_USER_NAME,
    GET_USERS_PRODUCT_DATA,
    GET_SPECIFIC_USERS_PRODUCT_DATA,
    UPDATE_USER_POST_UPPER_LIKE,
    UPDATE_USER_POST_LOWER_LIKE,
    UPDATE_USER_VIEWS,
    DELETE_USER_POST,
    ADD_PRODUCT_COMMENT,
    READ_PRODUCT_COMMENT,
} from "../_action/types";

export default function userReducer(state, action) {
    switch (action.type) {
        //!---------------------------------------------------

        case TYPE_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload };
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };

        //!---------------------------------------------------

        case SEND_USER_NAME:
            return { ...state, uploadNameSuccess: action.payload };
        case SEND_USER_PROFILE:
            return { ...state, uploadProfileSuccess: action.payload };

        //!---------------------------------------------------

        case GET_USERS_PRODUCT_DATA:
            return { ...state, getProductsSuccess: action.payload };
        case GET_SPECIFIC_USERS_PRODUCT_DATA:
            return { ...state, getSpecificProductsSuccess: action.payload };

        //!---------------------------------------------------

        case UPDATE_USER_POST_UPPER_LIKE:
            return { ...state, updateLikeSuccess: action.payload };

        case UPDATE_USER_POST_LOWER_LIKE:
            return { ...state, updateLikeSuccess: action.payload };

        //!---------------------------------------------------

        case UPDATE_USER_VIEWS:
            return { ...state, updateViewsSuccess: action.payload };

        //!---------------------------------------------------

        case ADD_PRODUCT_COMMENT:
            return { ...state, addCommentSuccess: action.payload };
        case READ_PRODUCT_COMMENT:
            return { ...state, readCommentSuccess: action.payload };

        //!---------------------------------------------------

        case DELETE_USER_POST:
            return { ...state, deleteProductSuccess: action.payload };

        //!---------------------------------------------------

        default:
            return "";
    }
}
