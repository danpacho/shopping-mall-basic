import styled, { css } from "styled-components";

export const Tags = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    flex-direction: ${(props) => props.isInteraction && "column"};

    height: auto;
    margin: 0.5rem;

    ${(props) =>
        props.isTags &&
        css`
            width: fit-content;
            justify-content: left;
        `};

    ${(props) =>
        props.isSpecificBox &&
        css`
            font-size: 1.25rem;

            width: 100%;
            height: 12.5%;

            margin: 0;
            padding: 1.5rem 0;

            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(25px);

            border-radius: 0 0 0.75rem 0.75rem;

            border-top-width: 0.1rem;
        `};
`;

export const Tag = styled.li`
    transition: all ease-in 0.15s;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    width: fit-content;
    height: auto;
    margin: 0.25rem;

    padding: 0.5rem;

    font-size: 0.75rem;
    font-weight: 600;

    &:hover {
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);

        color: whitesmoke;

        transform: translateY(-0.15rem) scale(1.05);
    }
    ${(props) =>
        props.isTag &&
        css`
            margin: 0;
            margin-right: 0.75rem;
            margin-bottom: 0.75rem;

            background: white;

            @media only screen and (max-width: 768px) {
                font-size: 0.75rem;

                margin-bottom: 0.5rem;
            }
        `}
    ${(props) =>
        props.isInteraction &&
        css`
            transition: all ease-in-out 0.25s;
            border: none;

            font-weight: 400;
            color: "#BFBFBF";

            padding: 0;
            margin: 0.5rem;

            &:hover {
                background: transparent;
                color: #262626;
                text-decoration: underline;

                transform: none;
            }
        `};

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    cursor: pointer;
`;
