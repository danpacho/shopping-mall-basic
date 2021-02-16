import styled, { css } from "styled-components";

export const UserConfigLists = styled.ul`
    width: fit-content;
    margin-top: 0.5rem;
    padding: 2.5rem;
    border-left: 1.5px solid #a6a6a6;

    @media only screen and (max-width: 768px) {
        border-left: 0;
        border-top: 1px solid #a6a6a6;

        margin-top: 2rem;
        padding-right: 0;
        padding-left: 0;
        padding-bottom: 0.5rem;
    }
`;

export const List = styled.li`
    width: 10rem;
    transition: all ease-out 0.1s;

    padding-bottom: 0.25rem;
    cursor: pointer;
    ${(props) =>
        props.isTitle &&
        css`
            margin-bottom: 0.25rem;
            font-family: "Do Hyeon";

            display: flex;
            flex-direction: row;
            justify-content: space-between;
        `}

    ${(props) =>
        props.isConfig &&
        css`
            text-decoration: underline;

            &:hover {
                color: #03a678;
            }
        `}
    display:${(props) => props.toggle && "none"};
`;
