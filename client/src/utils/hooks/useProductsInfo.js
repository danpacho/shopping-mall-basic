import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserFiles } from "../../_action/get_user_files_action";

//! product를 조회하는 hook.
function useProductsInfo() {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    const dispatchProducts = useCallback(async () => {
        const response = await dispatch(getUserFiles());
        if (response.payload.getProductsSuccess) {
            setProducts(response.payload.productInfo);
        }
    }, [dispatch]);

    useEffect(() => {
        dispatchProducts();
    }, [dispatchProducts]);

    if (products.length !== 0) {
        return products;
    }
}

export default useProductsInfo;
