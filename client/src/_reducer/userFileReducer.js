import { SEND_USER_FILE, SEND_USER_THUMBNAIL } from "../_action/types";

export default function userFileReducer(state, action) {
    switch (action.type) {
        case SEND_USER_FILE:
            return { ...state, uploadSuccess: action.payload };
        case SEND_USER_THUMBNAIL:
            return { ...state, uploadThumbnailSuccess: action.payload };
        default:
            return "";
    }
}
