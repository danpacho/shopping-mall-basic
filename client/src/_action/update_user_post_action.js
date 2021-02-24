import axios from "axios";
import {
    UPDATE_USER_POST_LOWER_LIKE,
    UPDATE_USER_POST_UPPER_LIKE,
    UPDATE_USER_VIEWS,
    ADD_PRODUCT_COMMENT,
    DELETE_USER_POST,
    READ_PRODUCT_COMMENT,
} from "./types";

//!-----------------------------------------------------------------------------------

const UPDATE_UPPER_LIKE_URL = "/api/product/products/update/like_up";
const UPDATE_LOWER_LIKE_URL = "/api/product/products/update/like_down";
const UPDATE_VIEWS_URL = "/api/product/products/update/views";

//------------------------------------------------------------------------------------

const ADD_COMMENT_URL = "/api/product/products/comment/add";
const READ_COMMENT_URL = "/api/product/products/comment/read";

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

export async function addProductComment(dataToSend) {
    const request = await axios.post(ADD_COMMENT_URL, dataToSend);

    return {
        type: ADD_PRODUCT_COMMENT,
        payload: request.data,
    };
}

export async function readProductComment(dataToSend) {
    const request = await axios.post(READ_COMMENT_URL, dataToSend);

    return {
        type: READ_PRODUCT_COMMENT,
        payload: request.data,
    };
}

//!-----------------------------------------------------------------------------------

export async function deleteProduct(dataToSend) {
    const request = await axios.delete(DELETE_POST_URL, {
        data: {
            dataToSend,
        },
    });

    // DELETE 요청에 body내용 포함시키기 : 두 번째 인자에 data: {} atrribute를 넣어주면 된다.

    return {
        type: DELETE_USER_POST,
        payload: request.data,
    };
}

//!-----------------------------------------------------------------------------------
