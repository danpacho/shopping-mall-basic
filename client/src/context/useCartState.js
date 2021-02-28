import { useContext } from "react";
import { CartStateContext } from "./CartContext";

function useCartState() {
    const context = useContext(CartStateContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

export default useCartState;
