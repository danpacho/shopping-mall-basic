//----------------------------------------------------------------------------------
import styled from "styled-components";
//----------------------------------------------------------------------------------
import {
    AddToCart,
    Download,
    Exit,
    FillHeart,
    Heart,
    UserDemo,
    VideoTime,
    Views,
} from "../assets/iconComponents";
//----------------------------------------------------------------------------------
import { TAG_STYLE } from "../utils/ClassName";
import ProfileImageContainer from "../utils/ProfileImageContainer";
import { Tags, Tag } from "../utils/TagContainer";
//----------------------------------------------------------------------------------
import useTagsFilter from "../utils/hooks/useTagsFilter";
//----------------------------------------------------------------------------------
import React, { useCallback, useEffect, useState } from "react";
//----------------------------------------------------------------------------------
import { Link } from "react-router-dom";
//----------------------------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//----------------------------------------------------------------------------------
import { updateProductViews } from "../_action/update_user_post_action";
import Input from "../utils/Input";
//----------------------------------------------------------------------------------

const PictureContainer = styled.div`
    width: 100%;
    height: 87.5%;
    display: flex;
    align-items: center;
    flex-direction: row;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
    @media only screen and (max-width: 468px) {
    }
`;

const Container = styled.div`
    transition: all ease-in-out 0.2s;

    width: 85%;
    height: 85%;

    margin-top: 1.5rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(25px);

    z-index: 1;

    @keyframes init {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    animation: init 0.5s ease-in-out;

    display: ${(props) => (props.toggle ? "block" : "none")};
`;

const ContentContainer = styled.div`
    width: 40%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;

    padding: -1rem;

    border-left-width: 0.1rem;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 40%;

        border-left-width: 0;
        border-top-width: 0.1rem;
    }
`;

const Background = styled.img`
    width: 60%;
    max-height: 100%;

    object-fit: contain;

    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 60%;

        object-fit: cover;
        border-radius: 0.75rem 0.75rem 0 0;
    }
`;

const TagContainer = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    margin-top: 1rem;
    width: 100%;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: left;

    height: max-content;

    margin: 1rem;
`;

const ExitBtn = styled.div`
    transition: all ease-in-out 0.2s;

    position: absolute;
    top: 0;
    right: 0;

    padding: 1.5rem;

    &:hover {
        color: gray;
    }
`;

//----------------------------------------------------------------------------------

function LandingSpecificBox({
    product,
    toggle = false,
    toggleBar,
    like,
    dislike,
    dispatchUpperLike,
    dispatchLowerLike,
    renderLike,
    view,
}) {
    const {
        _id,
        title,
        playTime,
        description,
        tags,
        download,
        thumbnailPath,
        writer,
    } = product;

    const newTags = useTagsFilter(tags);

    const userId = useSelector((state) => state.userReducer?.userData?._id);

    return (
        <Container toggle={toggle} className={"rounded-xl shadow-lg"}>
            <PictureContainer>
                <Background
                    alt="thumbnail-img"
                    src={`http://localhost:5000/${thumbnailPath}`}
                />
                <ContentContainer className={"border-gray-300"}>
                    <div className={"m-4 flex flex-col justify-evenly"}>
                        <p className={"mt-4 text-xl"}>{title}</p>
                        <p className={"mt-4"}>{description}</p>
                        <TagContainer>
                            {newTags.map(
                                (tag, idx) =>
                                    tag !== "" && (
                                        <Tag
                                            className={TAG_STYLE}
                                            isTag={true}
                                            key={idx}
                                        >
                                            {tag}
                                        </Tag>
                                    )
                            )}
                        </TagContainer>
                    </div>
                    <CommentContainer>
                        <Input
                            placeholder="comments here..."
                            isUploadPage={true}
                        />
                    </CommentContainer>
                </ContentContainer>
            </PictureContainer>

            <Tags isSpecificBox={true} className={"border-gray-300"}>
                <Tag isInteraction={true}>
                    {dislike && (
                        <Heart
                            width={"1.75em"}
                            height={"1.75em"}
                            className={
                                "hover:text-red-500 transition-all ease-in-out duration-200"
                            }
                            onClick={dispatchUpperLike}
                        />
                    )}
                    {like && (
                        <FillHeart
                            width={"1.75em"}
                            height={"1.75em"}
                            className={"text-red-400"}
                            onClick={dispatchLowerLike}
                        />
                    )}

                    {renderLike}
                </Tag>
                <Tag isInteraction={true}>
                    <Download
                        width={"1.75em"}
                        height={"1.75em"}
                        className={
                            "hover:text-green-500 transition-all ease-in-out duration-200"
                        }
                    />
                    {download}
                </Tag>
                <Tag isInteraction={true}>
                    <VideoTime
                        width={"1.75em"}
                        height={"1.75em"}
                        className={
                            "hover:text-red-500 transition-all ease-in-out duration-200"
                        }
                    />
                    {playTime}sec
                </Tag>
                <Tag isInteraction={true}>
                    <Views
                        width={"1.75em"}
                        height={"1.75em"}
                        className={
                            " hover:text-blue-500 transition-all ease-in-out duration-200"
                        }
                    />
                    {view}
                </Tag>
                <Tag isInteraction={true}>
                    <AddToCart
                        width={"1.75em"}
                        height={"1.75em"}
                        className={
                            "hover:text-yellow-300 transition-all ease-in-out duration-200"
                        }
                    />
                </Tag>

                <Tag isInteraction={true}>
                    {writer?.name && (
                        <Link to={`user/${writer?._id}`}>
                            by {writer?.name}
                        </Link>
                    )}
                </Tag>
                <Tag isInteraction={true}>
                    {!writer?.profilePath ? (
                        <UserDemo width={"1.75rem"} height={"1.75rem"} />
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

            <ExitBtn onClick={() => toggleBar(toggle)}>
                <Exit />
            </ExitBtn>
        </Container>
    );
}

export default LandingSpecificBox;
