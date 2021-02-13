import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserFiles } from "../../_action/get_user_files_action";

//! product를 조회하는 hook.
function useProductsInfo() {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useMemo(() => {
        const dispatchProducts = async () => {
            const response = await dispatch(getUserFiles);
            if (response.payload.getProductsSuccess) {
                setProducts(response.payload.productInfo);
            }
        };
        dispatchProducts();
    }, [dispatch]);

    return products;
}

export default useProductsInfo;
