import styled from "styled-components";

const Header = styled.header`
    position: sticky;
    top: 0;

    width: 100%;
    height: 3.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    border-bottom: 1px solid #0d0d0d;

    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);

    z-index: 5;
`;

export default Header;
