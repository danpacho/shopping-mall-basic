import styled, { css } from "styled-components";

const MainLogo = styled.h1`
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
`;

export default MainLogo;
