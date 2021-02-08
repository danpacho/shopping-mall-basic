//---------------------------------------------------------------
import Dropzone from "react-dropzone";
//---------------------------------------------------------------
import axios from "axios";
//---------------------------------------------------------------
import { useState } from "react";
//---------------------------------------------------------------
import styled from "styled-components";
//---------------------------------------------------------------
import { Pdf, Upload } from "../assets/iconComponents";
//---------------------------------------------------------------

const UploadContainer = styled.div`
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

    background-image: linear-gradient(to top, #3cba92 0%, #90f9c4 100%);

    &:hover {
        color: black;
        opacity: 0.9;
    }
`;

const UploadImgContainer = styled.div`
    transition: all ease-in-out 0.25s;
    z-index: 1;
    width: 50%;
    height: 100%;
    max-height: 80vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-right: 0.25px solid black;

    background: whitesmoke;
    &:hover {
        color: black;
        opacity: 0.95;
    }
    overflow: hidden;
`;

const UploadedImg = styled.img`
    z-index: 10;
    max-height: 65vh;
    width: auto;
`;

//---------------------------------------------------------------

function UploadFile() {
    const [pictures, setPictures] = useState([]);
    const [uploadComplete, setUploadComplete] = useState(false);

    const onDropHandler = async (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        const config = {
            header: { "content-type": "multipart/fomr-data" },
        };

        try {
            const response = await axios.post(
                "/api/product/pictures",
                formData,
                config
            );
            if (response.data.uploadSuccess) {
                setPictures([...pictures, response.data.filePath]);
                setUploadComplete(true);
            } else {
                setUploadComplete(false);
                alert("file upload failed!");
            }
        } catch (err) {
            setUploadComplete(false);
            console.log(err);
        }
    };

    return (
        <>
            <Dropzone onDrop={onDropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <>
                        {!uploadComplete ? (
                            <UploadContainer {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Upload width={"3em"} height={"3em"} />
                            </UploadContainer>
                        ) : (
                            pictures.map((picture, idx) => (
                                <UploadImgContainer key={picture}>
                                    {picture.includes("pdf", 1) ? (
                                        <Pdf
                                            width={"5em"}
                                            height={"5em"}
                                            color={"#F2294E"}
                                        />
                                    ) : (
                                        <UploadedImg
                                            src={`http://localhost:5000/${picture}`}
                                        />
                                    )}
                                    <p className={"mt-4 font-bold"}>
                                        {picture}
                                    </p>
                                </UploadImgContainer>
                            ))
                        )}
                    </>
                )}
            </Dropzone>
        </>
    );
}

export default UploadFile;
