//--------------------------------------------------
import React, { useCallback, useEffect, useMemo, useState } from "react";
//--------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import {
    authUser,
    sendUserName,
    sendUserProfile,
} from "../../_action/user_action";
//--------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//--------------------------------------------------
import { useForm } from "react-hook-form";
//--------------------------------------------------
import styled from "styled-components";
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
    CONFIG_BOX_DEFAULT_STYLE,
} from "../../utils/ClassName";
//--------------------------------------------------
import ConfigButton from "../../utils/ConfigButton";
import useToggleBar from "../../utils/hooks/useToggleBar";
import useNotificationBar from "../../utils/hooks/useNotificationMessage";
import useProductsInfo from "../../utils/hooks/useProductsInfo";
import LandingPage from "../../components/LandingPage";
import Dropzone from "react-dropzone";
import UserConfigContainer from "../../utils/UserConfigContainer";
import ProfileImageContainer from "../../utils/ProfileImageContainer";
import { List, UserConfigLists } from "../../utils/UserConfigLists";
//--------------------------------------------------

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    height: 10rem;
    width: 10rem;

    &:active,
    &:focus {
        outline: none;
    }

    cursor: pointer;
`;

//--------------------------------------------------

function AccountPage() {
    const dispatch = useDispatch();

    //! HOOKS
    const [toggleBar, toggle] = useToggleBar();
    const uploadSuccessNotification = useNotificationBar("Update Success!");
    const products = useProductsInfo();

    const [userInfo, setUserInfo] = useState({});
    const [nameUpdate, setNameUpdate] = useState(false);
    const [profileUpdate, setProfileUpdate] = useState(false);

    const userData = useSelector((state) => state.userReducer.userData);

    const uploadProfileState = useSelector(
        (state) => state.userReducer.uploadProfileSuccess?.uploadProfileSuccess
    );
    const uploadNameState = useSelector(
        (state) => state.userReducer.uploadNameSuccess?.uploadNameSuccess
    );
    //! 페이지 렌더시 userData에서 name, email을 추출

    const setUserData = useCallback((userData) => {
        const Data = {
            name: userData?.name,
            email: userData?.email,
            profile: userData?.profilePath,
        };
        setUserInfo({ ...Data });
    }, []);

    //! product filter

    const filteringProducts = useMemo(() => {
        if (products) {
            return products.filter(
                (product) => product?.writer?._id === userData?._id
            );
        }
    }, [products, userData]);

    //! form handle
    const { register, watch, getValues } = useForm();

    let nickNameLength = watch("nickName", "").length;

    const handleUserInputChange = () => {
        if (nickNameLength <= 10) {
            toggleBar(toggle);
            setNameUpdate(false);

            //! 유저가 입력한 경우
            if (nickNameLength > 0) {
                const newName = {
                    name: getValues("nickName"),
                    email: userData.email,
                };

                if (userInfo.name !== newName.name) {
                    setUserInfo({ ...newName });
                    dispatchUpdateUserName(newName);
                }
            }
        }
    };

    const onDropHandler = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("email", userData.email);
        const config = {
            header: { "content-type": "multipart/fomr-data" },
        };

        dispatchUserProfile(formData, config);
    };

    //! dispatch 시 같은 reducer에 있어야 기존 payload가 제거되지 않음. -memo
    const dispatchUserProfile = async (formData, config) => {
        try {
            const response = await dispatch(sendUserProfile(formData, config));
            dispatch(authUser());

            if (response.payload.uploadProfileSuccess) {
                setProfileUpdate(true);
                setTimeout(() => {
                    setProfileUpdate(false);
                    window.location.reload();
                }, 3500);
            } else {
                setProfileUpdate(false);
                alert("File upload failed😢");
            }
        } catch (err) {
            alert("err!");
            console.log(err);
        }
    };

    const dispatchUpdateUserName = async (newName) => {
        try {
            const response = await dispatch(sendUserName(newName));

            if (response.payload.uploadNameSuccess) {
                setNameUpdate(true);
                setTimeout(() => {
                    setNameUpdate(false);
                    window.location.reload();
                }, 3500);
            } else {
                setNameUpdate(false);
                alert("Name upldate failed😢");
            }
        } catch (err) {
            alert("err!");
            console.log(err);
        }
    };

    useEffect(() => {
        setUserData(userData);
    }, [setUserData, userData]);

    return (
        <Container isMainPage={true}>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>

            <UserConfigContainer className={CONFIG_BOX_DEFAULT_STYLE}>
                {userData?.profilePath ? (
                    <ImageContainer>
                        <ProfileImageContainer
                            alt="profile-img"
                            src={`http://localhost:5000/${userData?.profilePath}`}
                        />
                        <Dropzone
                            onDrop={onDropHandler}
                            accept=".jpeg,.png, .svg"
                        >
                            {({
                                getRootProps,
                                getInputProps,
                                isDragActive,
                                isDragAccept,
                            }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    {!isDragActive && (
                                        <>
                                            <ConfigButton
                                                className={`${CONFIG_BTN_STYLE} ${CONFIG_SAFE_BTN_STYLE}`}
                                                isUpload={true}
                                            >
                                                Update 👋
                                            </ConfigButton>
                                        </>
                                    )}

                                    {isDragActive && !isDragAccept && (
                                        <MainLogo>Drop Here</MainLogo>
                                    )}
                                </div>
                            )}
                        </Dropzone>
                    </ImageContainer>
                ) : (
                    <Dropzone
                        onDrop={onDropHandler}
                        accep={("image/jpeg", "image/png")}
                    >
                        {({
                            getRootProps,
                            getInputProps,
                            isDragActive,
                            isDragAccept,
                        }) => (
                            <ImageContainer {...getRootProps()}>
                                <input {...getInputProps()} />

                                {!isDragActive && (
                                    <>
                                        <UserDemo
                                            className={"text-green-500"}
                                        />
                                        <ConfigButton
                                            className={`${CONFIG_BTN_STYLE} ${CONFIG_SAFE_BTN_STYLE}`}
                                            isUpload={true}
                                        >
                                            Drag or Click
                                        </ConfigButton>
                                    </>
                                )}

                                {isDragActive && !isDragAccept && (
                                    <MainLogo>Drop Here</MainLogo>
                                )}
                            </ImageContainer>
                        )}
                    </Dropzone>
                )}

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

                    {uploadNameState && nameUpdate && uploadSuccessNotification}
                    {uploadProfileState &&
                        profileUpdate &&
                        uploadSuccessNotification}
                </UserConfigLists>
            </UserConfigContainer>

            <MainLogo isAccountPage={true}>Your Attribution</MainLogo>

            <LandingPage products={filteringProducts} isAccountPage={true} />
        </Container>
    );
}

export default withRouter(React.memo(AccountPage));
