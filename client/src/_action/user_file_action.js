import axios from "axios";

import { SEND_USER_FILE, SEND_USER_THUMBNAIL } from "./types";

const SEND_USER_FILE_URL = "/api/product/data/file";
const SEND_USER_THUMBNAIL_URL = "/api/product/data/thumbnail";

export async function sendUserFile(formData, config) {
    const request = await axios.post(SEND_USER_FILE_URL, formData, config);

    return {
        type: SEND_USER_FILE,
        payload: request.data,
    };
}

export async function sendUserThumbnail(formData, config) {
    const request = await axios.post(SEND_USER_THUMBNAIL_URL, formData, config);

    return {
        type: SEND_USER_THUMBNAIL,
        payload: request.data,
    };
}
