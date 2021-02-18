import styled, { css } from "styled-components";

const Container = styled.div`
    width: 100%;
    height: ${(props) => (props.isMainPage ? "auto" : "100vh")};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: "Work Sans", sans-serif, "Nanum Gothic Coding", monospace;
    color: #0d0d0d;

    ${(props) =>
        props.isLoginPage &&
        css`
            justify-content: center;
            background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        `}

    ${(props) =>
        props.isRegisterPage &&
        css`
            justify-content: center;
            background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
        `};

    ${(props) =>
        props.isSpecificBox &&
        css`
            position: absolute;
            top: 50;
            left: 50%auto;
            transform: translate(-50%, -50%);

            display: ${(props) => (props.toggle ? "block" : "none")};
            flex-direction: none;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);

            z-index: 50;
        `};
`;

export default Container;
