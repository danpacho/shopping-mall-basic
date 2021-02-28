import React, { useReducer, createContext } from "react";

import {
    ADD_CART_ITEM,
    DELETE_CART_ITEM,
    GET_CART_ITEM,
    RESET_CART_ITEM,
} from "./cart_types";

function cartReducer(state, action) {
    switch (action.type) {
        case GET_CART_ITEM:
            return {
                ...state,
                type: action.type,
                getItems: action.payload,
            };

        case ADD_CART_ITEM:
            return {
                ...state,
                type: action.type,
                addItems: action.payload,
            };

        case DELETE_CART_ITEM:
            return {
                ...state,
                type: action.type,
                deleteItems: action.payload,
            };

        case RESET_CART_ITEM:
            return {
                ...state,
                type: action.type,
                resetItems: action.payload,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const initialCartArray = [];

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartArray);

    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
}
