import styled, { css } from "styled-components";

const MainLogo = styled.h1`
    transition: all ease-in-out 0.3s;

    font-size: 2.5rem;
    font-family: "Abel", sans-serif;

    margin-left: 0.5rem;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    flex: ${(props) => props.isMainPage && "5"};

    ${(props) =>
        props.isUploadPage &&
        css`
            font-size: 2rem;
        `}
    ${(props) =>
        props.isAccountPage &&
        css`
            margin: 0;
            margin-top: 0.5rem;
            font-size: 1.5rem;
        `}

    @media only screen and (max-width: 768px) {
        font-size: 1.5rem;
    }
    @media only screen and (max-width: 468px) {
        font-size: 20px;
    }
`;

export default MainLogo;
