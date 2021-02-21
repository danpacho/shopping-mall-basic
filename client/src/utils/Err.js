import styled, { css } from "styled-components";

const Err = styled.p`
    font-family: "Do Hyeon";
    font-size: 1rem;

    width: 250px;

    display: flex;
    align-items: center;
    justify-content: center;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    ${(props) =>
        props.isAccountPage &&
        css`
            width: 12rem;
            text-align: left;
        `}
    ${(props) =>
        props.isUploadPage &&
        css`
            width: 45%;
            height: 30px;

            margin-top: 1rem;
        `}
    ${(props) =>
        props.isAccountPage &&
        css`
            position: absolute;
            bottom: 2.5rem;
            left: 50%;

            transform: translate(-50%, -50%);

            width: 50%;
        `}
`;

export default Err;
