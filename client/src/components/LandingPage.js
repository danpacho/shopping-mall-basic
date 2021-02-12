import styled from "styled-components";
//-------------------------------------------------------------------
import React, { useMemo, useState } from "react";
//-------------------------------------------------------------------
import { useDispatch } from "react-redux";
import { getUserFiles } from "../_action/get_user_files_action";
//-------------------------------------------------------------------
import LandingBox from "./LandingBox";
//-------------------------------------------------------------------

const BoxContainer = styled.div`
    width: 90%;
    height: fit-content;

    padding-bottom: 3rem;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 0.5rem;
    justify-items: center;
`;

//-------------------------------------------------------------------

function LandingPage() {
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

    return (
        <BoxContainer className={"mt-8"}>
            {products &&
                products.map((product) => (
                    <LandingBox product={product} key={product._id} />
                ))}
        </BoxContainer>
    );
}

export default LandingPage;
