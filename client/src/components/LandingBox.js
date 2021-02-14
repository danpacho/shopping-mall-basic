import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { BOX_DEFAULT_STYLE, TAG_STYLE } from "../utils/ClassName";
import { AddToCart, Heart } from "../assets/iconComponents/index";
import background from "../assets/images/BlurMask.png";

const BoxModel = styled.div`
    transition: all ease-out 0.5s;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 20rem;
    height: 25rem;

    margin-bottom: 0.5rem;

    border-width: 0.1rem;

    background-image: ${(props) => props.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    color: #262626;

    &:hover {
        transform: translateY(-0.5rem);
    }
`;

const Tags = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    flex-direction: ${(props) => props.isInteraction && "column"};

    width: fit-content;
    height: auto;
    margin: 0.5rem;
`;

const Tag = styled.li`
    transition: all ease-in-out 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    width: fit-content;
    height: auto;
    margin: 0.25rem;

    padding: 0.5rem;

    font-size: 0.75rem;
    font-weight: 600;

    &:hover {
        background: #262626;
        color: whitesmoke;
    }
    ${(props) =>
        props.isInteraction &&
        css`
            border: none;

            font-weight: 400;
            color: "#BFBFBF";

            padding: 0;
            margin: 0.5rem;

            &:hover {
                background: transparent;
                color: #262626;
            }
        `};

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    cursor: pointer;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 2.5rem;

    font-family: "Do Hyeon", sans-serif;
    font-size: 1.25rem;
`;

const Contents = styled.div`
    width: 100%;

    border-top: 2px solid white;
`;

const BackgroundImg = styled.img`
    transition: all ease-in-out 0.25s;

    height: 100%;
    max-height: 15rem;

    width: auto;

    background: transparent;

    user-select: none;
    &:hover {
        opacity: 0.9;
    }
`;

//---------------------------------------------------------------

function LandingBox({ product }) {
    const [newTags, setNewTags] = useState([]);
    const { title, tags, likes, download, thumbnailPath, writer } = product;

    const handleRawTags = useCallback((tags) => {
        const seperateTagsArray = tags.split(",").map((arg) => {
            return arg.replace(" ", "");
            //! 공백 제거
        });
        setNewTags(seperateTagsArray);
    }, []);

    useEffect(() => {
        handleRawTags(tags);
    }, []);

    return (
        <BoxModel
            background={background}
            className={
                "container rounded shadow-sm hover:shadow border-gray-300"
            }
        >
            <Title className={"bg-gray-50"}>{title}</Title>
            <BackgroundImg
                src={`http://localhost:5000/${thumbnailPath}`}
                alt="img"
            />
            <Contents className={BOX_DEFAULT_STYLE}>
                <Tags>
                    {newTags.map(
                        (tag, idx) =>
                            tag !== "" && (
                                <Tag className={TAG_STYLE} key={idx}>
                                    {tag}
                                </Tag>
                            )
                    )}
                </Tags>
                <Tags>
                    <Tag isInteraction={true}>
                        <Heart
                            width={"1.75em"}
                            height={"1.75em"}
                            className={"hover:text-red-500"}
                        />
                        {likes}
                    </Tag>
                    <Tag isInteraction={true}>
                        <AddToCart
                            width={"1.75em"}
                            height={"1.75em"}
                            className={"hover:text-green-500"}
                        />
                        {download}
                    </Tag>
                    <Tag isInteraction={true}>by {writer?.name}</Tag>
                </Tags>
            </Contents>
        </BoxModel>
    );
}

export default LandingBox;
