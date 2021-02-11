import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFiles } from "../_action/get_user_files_action";

function LandingPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const dispatchProducts = async () => {
            const response = await dispatch(getUserFiles);
            console.log(response);
            if (response.payload.getProductsSuccess) {
                console.log(response.payload);
            }
        };
        dispatchProducts();
    }, []);

    return <div>landing page</div>;
}

export default LandingPage;
