import { Link } from "react-router-dom";
//------------------------------------------------
import { useForm } from "react-hook-form";
//------------------------------------------------
import styled from "styled-components";
//------------------------------------------------
import Container from "../utils/Container";
import Header from "../utils/Header";
import MainLogo from "../utils/MainLogo";
import Input from "../utils/Input";
import ConfigButton from "../utils/ConfigButton";
import UploadFile from "../utils/UploadFile";
//------------------------------------------------
import {
    CONFIG_BTN_STYLE,
    CONFIG_ERR_BTN_STYLE,
    CONFIG_SAFE_BTN_STYLE,
} from "../utils/ClassName";
//------------------------------------------------
import { UploadMain } from "../assets/iconComponents";
import { useState } from "react";
import { useSelector } from "react-redux";
//------------------------------------------------

const InputContainer = styled.form`
    transition: all ease-in-out 0.2s;

    width: 80%;
    height: 100%;
    margin: 2.5rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: linear-gradient(
            to bottom,
            #323232 0%,
            #3f3f3f 40%,
            #1c1c1c 150%
        ),
        linear-gradient(
            to top,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.25) 200%
        );
    background-blend-mode: multiply;

    color: white;
`;

const Head = styled.div`
    width: 100%;
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: left;
`;
const Content = styled.div`
    width: 100%;
    flex: 10;
    background: white;

    color: #000;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Descriptions = styled.ul`
    width: 45%;
    height: 90%;

    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    width: fit-content;
    padding-left: 0.5rem;

    font-size: 1.5rem;
    font-weight: 300;
    text-align: left;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    border-left: 5px solid #595959;
`;

//------------------------------------------------

function UploadFilePage() {
    const { register, handleSubmit, errors, watch } = useForm();

    const { uploadSuccess = false } = useSelector((state) => ({
        uploadSuccess: state.userFileReducer.uploadSuccess,
    }));

    const [upload, setUpload] = useState(false);

    const updateUploadState = (e) => {
        e.preventDefault();

        setUpload(uploadSuccess);
    };

    const dispatchSaveUserFiles = () => {};

    return (
        <Container>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>

            <InputContainer isUploadPage={true} className={"rounded shadow"}>
                <Head>
                    <MainLogo isUploadPage={true}>
                        {!upload
                            ? "Step1 - Share Your File "
                            : "Step2 - Set Thumbnail"}
                    </MainLogo>
                </Head>

                {!upload ? (
                    <Content>
                        <UploadFile nextStep={upload} />
                        <Descriptions>
                            <Title>Title</Title>
                            <Input
                                name="title"
                                type="text"
                                isUploadPage={true}
                                placeholder="title here!"
                                ref={register({ required: true })}
                            />
                            <Title>Descrition</Title>
                            <Input
                                name="description"
                                type="text"
                                isUploadPage={true}
                                placeholder="description here!"
                                ref={register({ required: true })}
                            />
                            <Title>Tags</Title>
                            <Input
                                name="tags"
                                type="text"
                                isUploadPage={true}
                                placeholder="spreate tags by ,"
                                ref={register({ required: true })}
                            />
                            <Title>Add Play Time - SEC</Title>
                            <Input
                                isUploadPage={true}
                                name="playTime"
                                type="number"
                                placeholder="video play time SEC"
                                max="30"
                                min="5"
                                ref={register({ required: true })}
                            />
                            <ConfigButton
                                isUploadPage={true}
                                className={`${CONFIG_BTN_STYLE} ${
                                    !errors ||
                                    CONFIG_SAFE_BTN_STYLE ||
                                    CONFIG_ERR_BTN_STYLE
                                }`}
                                onClick={updateUploadState}
                            >
                                <UploadMain />
                            </ConfigButton>
                        </Descriptions>
                    </Content>
                ) : (
                    <Content>
                        <UploadFile nextStep={upload} />
                        <Descriptions>
                            <Title>Thumbnail Title</Title>
                            <Input
                                name="thumbnailTitle"
                                type="text"
                                isUploadPage={true}
                                placeholder="thumbnail title here!"
                                ref={register({ required: true })}
                            />

                            <ConfigButton
                                isUploadPage={true}
                                className={`${CONFIG_BTN_STYLE} ${
                                    !errors ||
                                    CONFIG_SAFE_BTN_STYLE ||
                                    CONFIG_ERR_BTN_STYLE
                                }`}
                                onClick={dispatchSaveUserFiles}
                            >
                                <UploadMain />
                            </ConfigButton>
                        </Descriptions>
                    </Content>
                )}
            </InputContainer>
        </Container>
    );
}

export default UploadFilePage;
