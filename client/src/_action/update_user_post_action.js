import axios from "axios";
import {
    DELETE_USER_POST,
    UPDATE_USER_POST_LOWER_LIKE,
    UPDATE_USER_POST_UPPER_LIKE,
    UPDATE_USER_VIEWS,
} from "./types";

//!-----------------------------------------------------------------------------------

const UPDATE_UPPER_LIKE_URL = "/api/product/products/update/like_up";
const UPDATE_LOWER_LIKE_URL = "/api/product/products/update/like_down";
const UPDATE_VIEWS_URL = "/api/product/products/update/views";

//------------------------------------------------------------------------------------

const DELETE_POST_URL = "/api/product/products/delete";

//!-----------------------------------------------------------------------------------

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

//!-----------------------------------------------------------------------------------

export async function updateProductViews(dataToSend) {
    const request = await axios.patch(UPDATE_VIEWS_URL, dataToSend);

    return {
        type: UPDATE_USER_VIEWS,
        payload: request.data,
    };
}

//!-----------------------------------------------------------------------------------

export async function deleteProduct(dataToSend) {
    const request = await axios.patch(DELETE_POST_URL, dataToSend);

    return {
        type: DELETE_USER_POST,
        payload: request.data,
    };
}

//!-----------------------------------------------------------------------------------
