import styled from "styled-components";
import { Exit } from "../assets/iconComponents";

const ExitContainer = styled.div`
    transition: all ease-in-out 0.2s;

    position: absolute;
    top: 0;
    right: 0;

    padding: 1.5rem;

    &:hover {
        color: gray;
    }
`;

function ExitBtn({ onClick }) {
    return (
        <ExitContainer onClick={onClick}>
            <Exit />
        </ExitContainer>
    );
}

export default ExitBtn;
