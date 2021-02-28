//!-----------------------------------------------------------------------------------------

import {
    ADD_CART_ITEM,
    DELETE_CART_ITEM,
    GET_CART_ITEM,
    RESET_CART_ITEM,
} from "./cart_types";

const STORAGE_KEY = "CART";

//!-----------------------------------------------------------------------------------------

const getCartItems = (key) => JSON.parse(localStorage.getItem(key));

const deleteFromArrayElement = (orginalItem, deleteId) => {
    return orginalItem.filter(
        ({ product_id }) => String(deleteId) !== String(product_id)
    );
};

const addToArray = (orginalItem, addItem) => orginalItem.concat(addItem);

//!-----------------------------------------------------------------------------------------

export const readCartItem = () => {
    const items = getCartItems(STORAGE_KEY);

    return {
        type: GET_CART_ITEM,
        payload: items,
    };
};

export const addCartItem = (addedItem) => {
    const items = getCartItems(STORAGE_KEY);

    if (items) {
        const filterNum = items.filter(
            ({ product_id }) => product_id === addedItem[0].product_id
        ).length;

        if (filterNum === 0) {
            const addedArray = addToArray(items, addedItem);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(addedArray));
            return {
                type: ADD_CART_ITEM,
                payload: addedArray,
            };
        } else {
            alert("Items Already Exists😅!");
            return {
                type: ADD_CART_ITEM,
                payload: items,
            };
        }
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(addedItem));
        return {
            type: ADD_CART_ITEM,
            payload: addedItem,
        };
    }
};

export const deleteCartItem = (deleteId) => {
    const items = getCartItems(STORAGE_KEY);

    const deletedArray = deleteFromArrayElement(items, deleteId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(deletedArray));

    return {
        type: DELETE_CART_ITEM,
        payload: deletedArray,
    };
};

export const resetCartItem = () => {
    localStorage.removeItem(STORAGE_KEY);

    return {
        type: RESET_CART_ITEM,
        return: [],
    };
};
