import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Cog, FillHeart, Logout, UserCircle } from "../assets/iconComponents";

const NavContainer = styled.div`
    position: fixed;
    top: 4.5rem;
    right: 0;

    width: 10rem;
    height: auto;

    margin-right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-image: linear-gradient(160deg, #fdfbfb 0%, #ebedee 100%);
    border-radius: 0.5rem;

    display: none;

    ${(props) =>
        props.toggle &&
        css`
            display: block;
        `}
`;

const NavBtn = styled.button`
    transition: all 0.1s ease-out;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    width: inherit;
    height: 3rem;

    padding: 0.25rem 1rem;
    margin-right: 0.5rem;

    background: transparent;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }

    & + & {
        border-top: 1.5px solid gray;
    }
    &:hover {
        background: black;
        color: whitesmoke;
    }
    &:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
    }
    &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
    }
`;

function NavBar({ toggle, handleLogOut }) {
    return (
        <NavContainer toggle={toggle} className={"shadow-md"}>
            <NavBtn onClick={handleLogOut}>
                <Link to="/">logout</Link>
                <Logout />
            </NavBtn>
            <NavBtn>
                <Link to="/account">account</Link>
                <UserCircle />
            </NavBtn>
            <NavBtn>
                <Link to="/likes">likes</Link>
                <FillHeart width={"1rem"} hight={"1rem"} />
            </NavBtn>
            <NavBtn>
                <Link to="/settings">settings</Link>
                <Cog />
            </NavBtn>
        </NavContainer>
    );
}

export default NavBar;
