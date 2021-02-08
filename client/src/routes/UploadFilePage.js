import { Link } from "react-router-dom";
//------------------------------------------------
import { useForm } from "react-hook-form";
//------------------------------------------------

//------------------------------------------------
import Container from "../utils/Container";
import Header from "../utils/Header";
import MainLogo from "../utils/MainLogo";
//------------------------------------------------
import styled from "styled-components";
import { Upload, UploadMain } from "../assets/iconComponents";
import Input from "../utils/Input";
import ConfigButton from "../utils/ConfigButton";
import { CONFIG_BTN_STYLE, CONFIG_SAFE_BTN_STYLE } from "../utils/ClassName";
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

const UploadFile = styled.button`
    transition: all ease-in-out 0.1s;
    color: white;
    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0.3;
    border-right: 0.25px solid black;

    &:focus,
    &:active {
        outline: none;
    }

    /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
    background-image: linear-gradient(to top, #3cba92 0%, #90f9c4 100%);
    /* background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%); */
    &:hover {
        color: black;
        opacity: 0.9;
    }
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

    return (
        <Container>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>

            <InputContainer isUploadPage={true} className={"rounded shadow"}>
                <Head>
                    <MainLogo isUploadPage={true}>Share Your File</MainLogo>
                </Head>
                <Content>
                    <UploadFile>
                        <Upload width={"2em"} height={"2em"} />
                    </UploadFile>
                    <Descriptions>
                        <Title>Title</Title>
                        <Input isUploadPage={true} placeholder="title here!" />
                        <Title>Descrition</Title>
                        <Input
                            isUploadPage={true}
                            placeholder="description here!"
                        />
                        <Title>Tags</Title>
                        <Input
                            isUploadPage={true}
                            placeholder="spreate tags by ,"
                        />
                        <Title>Play Time</Title>
                        <Input
                            isUploadPage={true}
                            type="number"
                            placeholder="video play time"
                        />
                        <ConfigButton
                            isUploadPage={true}
                            className={`${CONFIG_BTN_STYLE} ${CONFIG_SAFE_BTN_STYLE}`}
                        >
                            <UploadMain />
                        </ConfigButton>
                    </Descriptions>
                </Content>
            </InputContainer>
        </Container>
    );
}

export default UploadFilePage;
