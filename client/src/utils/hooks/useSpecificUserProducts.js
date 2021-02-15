import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpecificUserFiles } from "../../_action/get_user_files_action";

function useSpecificUserProducts(id) {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [user, setUser] = useState([]);

    const dispatchSpecificUserProducts = useCallback(
        async (userId) => {
            const response = await dispatch(getSpecificUserFiles(userId));
            if (response.payload.getSpecificProductsSuccess)
                setProducts(response.payload.productsInfo);
            setUser(response.payload.productsInfo[0].writer);
        },
        [dispatch]
    );

    useEffect(() => {
        dispatchSpecificUserProducts(id);
    }, [dispatchSpecificUserProducts, id]);

    return [products, user];
}

export default useSpecificUserProducts;
