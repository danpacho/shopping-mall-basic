//--------------------------------------------------
import { useEffect, useState } from "react";
//--------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { modifyingUser } from "../../_action/user_action";
//--------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//--------------------------------------------------
import { useForm } from "react-hook-form";
//--------------------------------------------------
import styled, { css } from "styled-components";
//--------------------------------------------------
import Container from "../../utils/Container";
import Header from "../../utils/Header";
import MainLogo from "../../utils/MainLogo";
import Input from "../../utils/Input";
import Err from "../../utils/Err";
//--------------------------------------------------
import { UserDemo } from "../../assets/iconComponents";
//--------------------------------------------------
import {
    BTN_STYLE,
    ERR_INPUT_STYLE,
    ERR_TEXT_STYLE,
    INPUT_STYLE,
    CONFIG_BTN_STYLE,
    CONFIG_ERR_BTN_STYLE,
    CONFIG_SAFE_BTN_STYLE,
    BOX_DEFAULT_STYLE,
} from "../../utils/ClassName";
//--------------------------------------------------
import ConfigButton from "../../utils/ConfigButton";
import useToggleBar from "../../utils/hooks/useToggleBar";
import useNotificationBar from "../../utils/hooks/useNotificationMessage";
import useProductsInfo from "../../utils/hooks/useProductsInfo";
import LandingPage from "../../components/LandingPage";
//--------------------------------------------------

const UserConfigContainer = styled.div`
    width: 60%;
    height: 30%;

    margin: 1rem 0;
    padding: 1.5rem 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    border-width: 0.1rem;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    height: 10rem;
`;

const UserConfigLists = styled.ul`
    width: fit-content;
    margin-top: 0.5rem;
    padding: 2.5rem;
    border-left: 1px solid #a6a6a6;
`;

const List = styled.li`
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

//--------------------------------------------------

function AccountPage() {
    const dispatch = useDispatch();

    //! HOOKS
    const [toggleBar, toggle] = useToggleBar();
    const uploadSuccessNotification = useNotificationBar("Update Success!");
    const products = useProductsInfo();

    const [userInfo, setUserInfo] = useState({});
    const [update, setUpdate] = useState(0);

    const { userData = "" } = useSelector((state) => ({
        userData: state.userReducer.userData,
    }));

    //! 페이지 렌더시 userData에서 name, email을 추출
    useEffect(() => {
        const setUserData = (userData) => {
            const Data = { name: userData.name, email: userData.email };
            setUserInfo({ ...Data });
        };
        setUserData(userData);
    }, [userData]);

    //! product filter
    const filteringProducts = (products) => {
        return products.filter(
            (product) => product?.writer?._id === userData?._id
        );
    };

    const filterdProducts = filteringProducts(products);

    //! form handle
    const { register, watch, getValues } = useForm();

    let nickNameLength = watch("nickName", "").length;

    const handleUserInputChange = () => {
        if (nickNameLength <= 10) {
            toggleBar(toggle);
            setUpdate(0);

            //! 유저가 입력한 경우
            if (nickNameLength > 0) {
                const newName = {
                    name: getValues("nickName"),
                    email: userData.email,
                };

                if (userInfo.name !== newName.name) {
                    setUserInfo({ ...newName });
                    dispatchUpdateUserInfo(newName);
                }
            }
        }
    };

    const dispatchUpdateUserInfo = async (newName) => {
        const response = await dispatch(modifyingUser(newName));
        console.log(response);
        if (response.payload.updateSuccess) {
            setUpdate(1);
        }
    };

    return (
        <Container>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>

            <UserConfigContainer
                className={`${BOX_DEFAULT_STYLE} shadow-sm rounded-sm`}
            >
                <ImageContainer>
                    <UserDemo />
                    <ConfigButton className={CONFIG_BTN_STYLE}>
                        upload
                    </ConfigButton>
                </ImageContainer>
                <UserConfigLists>
                    <List isTitle={true}>
                        닉네임
                        <ConfigButton
                            className={`${CONFIG_BTN_STYLE} ${
                                nickNameLength <= 10
                                    ? CONFIG_SAFE_BTN_STYLE
                                    : CONFIG_ERR_BTN_STYLE
                            }   `}
                            onClick={handleUserInputChange}
                        >
                            {!toggle && "변경"}
                            {toggle && nickNameLength <= 10 && "확정"}
                            {toggle && nickNameLength > 10 && "초과"}
                        </ConfigButton>
                    </List>
                    <List isConfig={true} toggle={toggle}>
                        {userInfo?.name}
                    </List>

                    <List toggle={!toggle}>
                        <Input
                            isAccountPage={true}
                            name="nickName"
                            type="text"
                            defaultValue={userInfo.name}
                            placeholder="New name"
                            ref={register({
                                required: true,
                                minLength: 0,
                                maxLength: 10,
                            })}
                            className={`${BTN_STYLE} ${
                                nickNameLength <= 10
                                    ? INPUT_STYLE
                                    : ERR_INPUT_STYLE
                            }`}
                        />

                        {nickNameLength > 10 && (
                            <Err
                                isAccountPage={true}
                                className={ERR_TEXT_STYLE}
                            >
                                max nick name length is 10
                            </Err>
                        )}
                    </List>

                    <List isTitle={true}>이메일</List>
                    <List isConfig={true}>{userInfo?.email}</List>
                    {update === 1 && uploadSuccessNotification}
                </UserConfigLists>
            </UserConfigContainer>

            <MainLogo isAccountPage={true}>Your Attribution</MainLogo>

            <LandingPage products={filterdProducts} />
        </Container>
    );
}

export default withRouter(AccountPage);
