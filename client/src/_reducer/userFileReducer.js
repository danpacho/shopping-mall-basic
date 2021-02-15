import {
    SEND_USER_FILE,
    SEND_USER_THUMBNAIL,
    SEND_USER_TOTAL_DATA,
} from "../_action/types";

export default function userFileReducer(state, action) {
    switch (action.type) {
        case SEND_USER_FILE:
            return { ...state, uploadSuccess: action.payload };
        case SEND_USER_THUMBNAIL:
            return { ...state, uploadThumbnailSuccess: action.payload };
        case SEND_USER_TOTAL_DATA:
            return { ...state, uploadComplete: action.payload };

        default:
            return "";
    }
}
