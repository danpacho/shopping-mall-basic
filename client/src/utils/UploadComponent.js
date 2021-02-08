import styled from "styled-components";

import { Upload } from "../assets/iconComponents";
import axios from "axios";
import { useForm } from "react-hook-form";

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

function UploadFiles() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const { uploadFile } = data;
        console.log(uploadFile);
    };

    // const onDropHandler = async (files) => {
    //     const formData = new FormData();

    //     formData.append("file", files[0]);

    //     try {
    //         const response = await axios.post(
    //             "/api/product/pictures",
    //             formData
    //         );
    //         if (response.data.uploadSuccess) {
    //             console.log(response.data);
    //         } else {
    //             console.log(response.data);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <UploadContainer onSubmit={handleSubmit(onSubmit)}>
            <input ref={register} type="file" name="uploadFile"></input>

            <button>
                <Upload width={"2.5em"} height={"2.5em"} />
            </button>
        </UploadContainer>
    );
}

export default UploadFiles;
