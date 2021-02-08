import styled, { css } from "styled-components";
const ConfigButton = styled.button`
    transition: all ease-out 0.1s;

    width: 5rem;

    color: whitesmoke;
    background: #0d0d0d;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
        border: none;
    }

    ${(props) =>
        props.isUploadPage &&
        css`
            position: fixed;
            bottom: 10%;

            width: 32.5%;
            height: 30px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 1.25rem;
        `}
`;

export default ConfigButton;
