//-------------------------------------------------------------
import styled from "styled-components";
//-------------------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//-------------------------------------------------------------
import { BTN_STYLE } from "../utils/ClassName";
//-------------------------------------------------------------
import Container from "../utils/Container";
import Header from "../utils/Header";
import MainLogo from "../utils/MainLogo";
import NavBar from "../utils/NavBar";
//-------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../_action/user_action";
import {
    Login,
    UserAdd,
    ArrowDown,
    UploadMain,
    UserDemo,
} from "../assets/iconComponents";
//-------------------------------------------------------------
import LandingPage from "../components/LandingPage";
//-------------------------------------------------------------
import useToggleBar from "../utils/hooks/useToggleBar";
import useProductsInfo from "../utils/hooks/useProductsInfo";
import ProfileImageContainer from "../utils/ProfileImageContainer";
import { useEffect, useState } from "react";
//-------------------------------------------------------------

const Button = styled.button`
    transition: all 0.1s ease-in-out;

    width: 110px;
    padding: 0.25rem 1rem;
    margin-right: 0.5rem;

    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;

    &:hover {
        color: #262626;
        font-weight: 600;

        color: ${(props) => props.isSign && "#F2134F"};

        border-bottom: 2px solid black;
        border-bottom: ${(props) => props.isSign && "2px solid #F2134F"};
    }
    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }

    @media only screen and (max-width: 468px) {
        font-size: 1rem;
    }
`;

const ProfileBtn = styled.button`
    transition: 0.1s ease-out all;

    font-weight: 500;

    width: auto;
    height: 50px;

    padding: 0 1rem;
    margin-right: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    color: white;

    &:hover {
        border: 1px solid white;
    }

    &:active,
    &:focus {
        outline: none;
        /* 클릭시 남는 것들 완전히 제거 */
    }

    @media only screen and (max-width: 468px) {
        font-size: 0;
        padding: 0;
        padding-right: 0.5rem;

        margin-right: 0.25rem;
    }
`;

const PROFILE_STYLE = "rounded-full shadow-sm border hover:shadow-lg";
//-------------------------------------------------------------

function HomePage() {
    const dispatch = useDispatch();

    const [toggleBar, toggle] = useToggleBar(false);
    const products = useProductsInfo();

    //! 유저 정보 가져오기 -------------------------------------------------

    const { userData = false } = useSelector((state) => ({
        userData: state.userReducer.userData,
    }));

    //-----------------------------------------------------------------------
    const handleLogOut = async () => {
        const response = await dispatch(logoutUser);

        if (response.payload.logoutSuccess) {
            window.location.reload();
        } else {
            alert("logout faild");
        }
    };

    useEffect(() => {});

    //-----------------------------------------------------------------------

    return (
        <Container isMainPage={true}>
            <Header>
                <MainLogo isMainPage={true}>
                    <Link to="/">Note Share</Link>
                </MainLogo>
                {userData?.isAuth && (
                    <>
                        {/* //! 업로드 버튼 */}
                        <Link to="upload">
                            <Button
                                className={`${BTN_STYLE} focus:ring-gray-400 `}
                            >
                                upload
                                <UploadMain />
                            </Button>
                        </Link>
                        {/* //! 프로필 버튼 */}
                        <div
                            className={
                                "flex flex-row justify-between items-center mr-4"
                            }
                        >
                            <ProfileBtn
                                className={`${PROFILE_STYLE} select-none`}
                                onClick={() => toggleBar(toggle)}
                            >
                                <p className={"mr-2"}>{userData?.name}</p>
                                {!userData?.profilePath ? (
                                    <UserDemo
                                        width={"1.5rem"}
                                        height={"1.5rem"}
                                    />
                                ) : (
                                    <ProfileImageContainer
                                        alt="profile-img"
                                        src={`http://localhost:5000/${userData?.profilePath}`}
                                        isSpecificUser={true}
                                        isLittleCircle={true}
                                    />
                                )}
                            </ProfileBtn>
                            <ArrowDown />
                        </div>
                        <NavBar handleLogOut={handleLogOut} toggle={toggle} />
                    </>
                )}
                {!userData?.isAuth && (
                    <>
                        <Link to="/login">
                            <Button
                                className={`${BTN_STYLE} focus:ring-gray-400 `}
                            >
                                login
                                <Login />
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                isSign={true}
                                className={`${BTN_STYLE} focus:ring-red-500`}
                            >
                                sign in
                                <UserAdd />
                            </Button>
                        </Link>
                    </>
                )}
            </Header>
            <LandingPage products={products} />
        </Container>
    );
}

export default withRouter(HomePage);
