import axios from "axios";
import { GET_USERS_PRODUCT_DATA } from "./types";

const GET_USER_PRODUCT_URL = "/api/product/products";

export async function getUserFiles() {
    const request = await axios.post(GET_USER_PRODUCT_URL);

    return {
        type: GET_USERS_PRODUCT_DATA,
        payload: request.data,
    };
}
