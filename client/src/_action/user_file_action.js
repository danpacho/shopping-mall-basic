import axios from "axios";

import {
    SEND_USER_FILE,
    SEND_USER_THUMBNAIL,
    SEND_USER_TOTAL_DATA,
} from "./types";

const SEND_USER_FILE_URL = "/api/product/data/file";
const SEND_USER_THUMBNAIL_URL = "/api/product/data/thumbnail";
const SEND_USER_TOTAL_DATA_URL = "/api/product/";

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

export async function saveUserFiles(userData) {
    const request = await axios.post(SEND_USER_TOTAL_DATA_URL, userData);

    return {
        type: SEND_USER_TOTAL_DATA,
        payload: request.data,
    };
}
