//---------------------------------------------------------------
import Dropzone from "react-dropzone";
//---------------------------------------------------------------
import axios from "axios";
//---------------------------------------------------------------
import { useEffect, useState } from "react";
//---------------------------------------------------------------
import styled from "styled-components";
//---------------------------------------------------------------
import { Pdf, Upload } from "../assets/iconComponents";
//---------------------------------------------------------------
import { useDispatch } from "react-redux";
import { sendUserFile, sendUserThumbnail } from "../_action/user_file_action";
//---------------------------------------------------------------

const UploadContainer = styled.div`
    transition: all ease-in-out 0.1s;

    color: white;

    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0.5;
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

    background-image: ${(props) =>
        props.isThumbnailPage &&
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"};
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

function UploadFile({ nextStep }) {
    const dispatch = useDispatch();

    const [uploadComplete, setUploadComplete] = useState(false);
    const [uploadThumbnailComplete, setUploadThumbnailComplete] = useState(
        false
    );

    const [files, setFiles] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        console.log(nextStep.uploadSuccess);
    });

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
                const fileResponse = await dispatch(
                    sendUserFile(formData, config)
                );

                if (fileResponse.payload.uploadSuccess) {
                    console.log(fileResponse.payload);
                    setFiles([...files, fileResponse.payload.filePath]);
                    setUploadComplete(true);
                } else {
                    setUploadComplete(false);
                    alert("File upload failed😢");
                }
            } else {
                const thumbnailResponse = await dispatch(
                    sendUserThumbnail(formData, config)
                );

                if (thumbnailResponse.payload.uploadThumbnailSuccess) {
                    console.log(thumbnailResponse.payload);
                    setThumbnails([
                        ...thumbnails,
                        thumbnailResponse.payload.filePath,
                    ]);
                    setUploadThumbnailComplete(true);
                } else {
                    setUploadThumbnailComplete(false);
                    alert("Thumbnail upload failed😢");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return !nextStep.uploadSuccess ? (
        <Dropzone onDrop={onDropHandler}>
            {({ getRootProps, getInputProps }) => (
                <>
                    {!uploadComplete ? (
                        <UploadContainer
                            {...getRootProps()}
                            isThumbnailPage={nextStep}
                        >
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
    ) : (
        <Dropzone onDrop={onDropHandler}>
            {({ getRootProps, getInputProps }) => (
                <>
                    {!uploadThumbnailComplete ? (
                        <UploadContainer
                            {...getRootProps()}
                            isThumbnailPage={nextStep}
                        >
                            <input {...getInputProps()} />
                            <Upload width={"3em"} height={"3em"} />
                        </UploadContainer>
                    ) : (
                        thumbnails.map((thumbnail) => (
                            <UploadImgContainer key={thumbnail}>
                                <UploadedImg
                                    src={`http://localhost:5000/${thumbnail}`}
                                />
                                <p className={"mt-4 font-bold"}>{thumbnail}</p>
                            </UploadImgContainer>
                        ))
                    )}
                </>
            )}
        </Dropzone>
    );
}

export default UploadFile;
