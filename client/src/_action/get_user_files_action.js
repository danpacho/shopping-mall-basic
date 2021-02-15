import axios from "axios";
import {
    GET_SPECIFIC_USERS_PRODUCT_DATA,
    GET_USERS_PRODUCT_DATA,
} from "./types";

const GET_USER_PRODUCT_URL = "/api/product/products";
const GET_SPECIFIC_USER_PRODUCT_URL = "/api/product/products/user";

export async function getUserFiles() {
    const request = await axios.post(GET_USER_PRODUCT_URL);

    return {
        type: GET_USERS_PRODUCT_DATA,
        payload: request.data,
    };
}

export async function getSpecificUserFiles(userId) {
    const request = await axios({
        method: "POST",
        url: GET_SPECIFIC_USER_PRODUCT_URL,
        params: {
            id: userId,
        },
    });

    return {
        type: GET_SPECIFIC_USERS_PRODUCT_DATA,
        payload: request.data,
    };
}
