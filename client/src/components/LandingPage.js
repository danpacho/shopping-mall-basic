import styled from "styled-components";
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

function LandingPage({ products }) {
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
