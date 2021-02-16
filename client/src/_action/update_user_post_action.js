import axios from "axios";
import {
    UPDATE_USER_POST_LOWER_LIKE,
    UPDATE_USER_POST_UPPER_LIKE,
} from "./types";

const UPDATE_UPPER_LIKE_URL = "/api/product/products/update/like_up";
const UPDATE_LOWER_LIKE_URL = "/api/product/products/update/like_down";

export async function updateProductUpperLike(dataToSend) {
    const request = await axios.patch(UPDATE_UPPER_LIKE_URL, dataToSend);

    return {
        type: UPDATE_USER_POST_UPPER_LIKE,
        payload: request.data,
    };
}

export async function updateProductLowerLike(dataToSend) {
    const request = await axios.patch(UPDATE_LOWER_LIKE_URL, dataToSend);

    return {
        type: UPDATE_USER_POST_LOWER_LIKE,
        payload: request.data,
    };
}
