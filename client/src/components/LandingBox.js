import React, { useCallback, useEffect, useMemo, useState } from "react";
//----------------------------------------------------------------------------------

import styled, { css } from "styled-components";
//----------------------------------------------------------------------------------
import { Link } from "react-router-dom";
//----------------------------------------------------------------------------------
import { BOX_DEFAULT_STYLE, TAG_STYLE } from "../utils/ClassName";
import ProfileImageContainer from "../utils/ProfileImageContainer";
//----------------------------------------------------------------------------------
import { AddToCart, Heart, UserDemo } from "../assets/iconComponents/index";
import background from "../assets/images/BlurMask.png";
//----------------------------------------------------------------------------------

const BoxModel = styled.div`
    transition: all ease-out 0.2s;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 20rem;
    height: 26rem;

    margin-bottom: 0.5rem;

    background-image: ${(props) => props.background};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    color: #262626;

    &:hover {
        transform: translateY(-0.1rem);
    }
`;

const Tags = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    flex-direction: ${(props) => props.isInteraction && "column"};

    width: 50%;

    height: auto;
    margin: 0.5rem;

    ${(props) =>
        props.isTags &&
        css`
            width: fit-content;
            justify-content: left;
            margin: 0.25rem;
        `};
`;

const Tag = styled.li`
    transition: all ease-in 0.15s;

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
        background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);

        color: whitesmoke;

        transform: translateY(-0.15rem) scale(1.05);
    }
    ${(props) =>
        props.isInteraction &&
        css`
            transition: all ease-in-out 0.25s;
            border: none;

            font-weight: 400;
            color: "#BFBFBF";

            padding: 0;
            margin: 0.5rem;

            &:hover {
                background: transparent;
                color: #262626;
                text-decoration: underline;

                transform: none;
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

    border-top-width: 0.1rem;
`;

const BackgroundImg = styled.div`
    height: 100%;
    max-height: 15rem;

    width: auto;

    background: transparent;

    user-select: none;
`;

const BackgroundImgContainer = styled.img`
    transition: all ease-in-out 0.45s;

    height: inherit;
    max-height: inherit;

    width: inherit;

    user-select: none;

    &:hover {
        transform: scale(1.05);
        opacity: 0.99;
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

    const handleLikeAction = () => {};

    useEffect(() => {
        handleRawTags(tags);
    }, []);

    return (
        <BoxModel
            background={background}
            className={"container rounded shadow-sm hover:shadow"}
        >
            <Title className={"bg-gray-50"}>{title}</Title>
            <BackgroundImg>
                <BackgroundImgContainer
                    src={`http://localhost:5000/${thumbnailPath}`}
                    alt="thumbnail-img"
                />
            </BackgroundImg>
            <Tags
                isTags={true}
                className={"w-full flex items-center content-start"}
            >
                {newTags.map(
                    (tag, idx) =>
                        tag !== "" && (
                            <Tag className={TAG_STYLE} key={idx}>
                                {tag}
                            </Tag>
                        )
                )}
            </Tags>
            <Contents className={BOX_DEFAULT_STYLE}>
                <div
                    className={
                        "w-full h-12 flex flex-row items-center content-end"
                    }
                >
                    <Tags>
                        <Tag isInteraction={true} onClick={handleLikeAction}>
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
                    </Tags>
                    <Tags>
                        <Tag isInteraction={true}>
                            {writer?.name && (
                                <Link to={`user/${writer?._id}`}>
                                    by {writer?.name}
                                </Link>
                            )}
                        </Tag>
                        <Tag isInteraction={true}>
                            {!writer?.profilePath ? (
                                <UserDemo width={"1.5rem"} height={"1.5rem"} />
                            ) : (
                                <ProfileImageContainer
                                    alt="profile-img"
                                    src={`http://localhost:5000/${writer?.profilePath}`}
                                    isSpecificUser={true}
                                    isLittleCircle={true}
                                />
                            )}
                        </Tag>
                    </Tags>
                </div>
            </Contents>
        </BoxModel>
    );
}

export default LandingBox;
