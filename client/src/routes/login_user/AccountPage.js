//--------------------------------------------------
import { useCallback, useEffect, useMemo, useState } from "react";
//--------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import {
    authUser,
    modifyingUser,
    sendUserName,
    sendUserProfile,
} from "../../_action/user_action";
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
import Dropzone from "react-dropzone";
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
    width: 10rem;

    &:active,
    &:focus {
        outline: none;
    }

    cursor: pointer;
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

const ProfileImage = styled.img`
    transition: all ease-out 0.2s;

    width: auto;
    height: 8.5rem;

    max-width: 8.5rem;
    max-height: 8.5rem;

    border-width: 0.1rem;
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
        (state) => state.userReducer.uploadNameSuccess?.updateSuccess
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
        return products.filter(
            (product) => product?.writer?._id === userData?._id
        );
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
                    dispatchUpdateUserInfo(newName);
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

    const dispatchUserProfile = async (formData, config) => {
        try {
            const response = await dispatch(sendUserProfile(formData, config));
            dispatch(authUser());

            if (response.payload.uploadProfileSuccess) {
                setProfileUpdate(true);
            } else {
                setProfileUpdate(false);
                alert("File upload failed😢");
            }
        } catch (err) {
            alert("err!");
            console.log(err);
        }
    };

    const dispatchUpdateUserInfo = async (newName) => {
        try {
            const response = await dispatch(sendUserName(newName));
            if (response.payload.updateSuccess) {
                setNameUpdate(true);
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
        setNameUpdate(false);
    }, [setUserData, userData]);

    return (
        <Container isMainPage={true}>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>

            <UserConfigContainer
                className={`${BOX_DEFAULT_STYLE} shadow-sm rounded-sm`}
            >
                {userData?.profilePath ? (
                    <ImageContainer>
                        <ProfileImage
                            alt=""
                            src={`http://localhost:5000/${userData?.profilePath}`}
                            className={
                                "rounded-full shadow-sm hover:shadow border-gray-300 hover:border-green-500 select-none"
                            }
                        />
                        <Dropzone onDrop={onDropHandler}>
                            {({
                                getRootProps,
                                getInputProps,
                                isDragActive,
                                isDragAccept,
                            }) => (
                                <div {...getRootProps()}>
                                    <input
                                        type="file"
                                        accept=".jpeg,.png"
                                        {...getInputProps()}
                                    />

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
                                        <UserDemo />{" "}
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

            <LandingPage products={filteringProducts} />
        </Container>
    );
}

export default withRouter(AccountPage);
