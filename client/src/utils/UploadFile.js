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
import { useDispatch } from "react-redux";
import { sendUserFile } from "../_action/user_file_action";
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
    const dispatch = useDispatch();

    const [uploadComplete, setUploadComplete] = useState(false);
    const [files, setFiles] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);

    const onDropHandler = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        const config = {
            header: { "content-type": "multipart/fomr-data" },
        };

        dispatchUserFile(formData, config);
    };

    const dispatchUserFile = async (formData, config) => {
        try {
            if (!uploadComplete) {
                const response = await dispatch(sendUserFile(formData, config));

                if (response.payload.uploadSuccess) {
                    console.log(response.payload);
                    setFiles([...files, response.payload.filePath]);
                    setUploadComplete(true);
                } else {
                    setUploadComplete(false);
                    alert("File upload failed😢");
                }
            } else {
                const response = await dispatch(sendUserFile(formData, config));

                if (response.payload.uploadThumbnailSuccess) {
                    console.log(response.payload);
                    setThumbnails([...thumbnails, response.payload.filePath]);
                    setUploadComplete(true);
                } else {
                    setUploadComplete(false);
                    alert("Thumbnail upload failed😢");
                }
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
                            files.map((file) => (
                                <UploadImgContainer key={file}>
                                    {file.includes("pdf", 1) ? (
                                        <Pdf
                                            width={"5em"}
                                            height={"5em"}
                                            color={"#F2294E"}
                                        />
                                    ) : (
                                        <UploadedImg
                                            src={`http://localhost:5000/${file}`}
                                        />
                                    )}
                                    <p className={"mt-4 font-bold"}>{file}</p>
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
