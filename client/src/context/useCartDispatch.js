import { useContext } from "react";
import { CartDispatchContext } from "./CartContext";

function useCartDispatch() {
    const context = useContext(CartDispatchContext);
    if (!context) {
        throw new Error("Cannot find TodoProvider");
    }
    return context;
}

export default useCartDispatch;
