import styled from "styled-components";

const UserConfigContainer = styled.div`
    transition: all ease-in-out 0.2s;

    width: 60%;
    height: 30%;

    margin: 1rem 0;
    padding: 1.5rem 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    border-width: 0.25rem;

    @media only screen and (max-width: 768px) {
        flex-direction: column;

        height: 50%;
    }
`;

export default UserConfigContainer;
