//!-----------------------------------------------------------------------------------------

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

    return items;
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
            return addedArray;
        } else {
            alert("items already exists😅");
        }
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(addedItem));
        return addedItem;
    }
};

export const deleteCartItem = (deleteId) => {
    console.log(deleteId);
    const items = getCartItems(STORAGE_KEY);

    const deletedArray = deleteFromArrayElement(items, deleteId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(deletedArray));

    return deletedArray;
};

export const resetCartItem = () => localStorage.removeItem(STORAGE_KEY);
