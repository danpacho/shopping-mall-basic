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
import { Link, withRouter } from "react-router-dom";
//----------------------------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//----------------------------------------------------------------------------------
import { useForm } from "react-hook-form";
import Input from "../utils/Input";
import CommentBox from "../components/Comment";
import {
    addProductComment,
    readProductComment,
} from "../_action/update_user_post_action";
import axios from "axios";
import ExitBtn from "../utils/ExitBtn";
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

    width: 90%;
    height: 85%;

    margin-top: 1.5rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(30px);

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

    border-left-width: 0.1rem;

    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 40%;

        border-left-width: 0;
        border-top-width: 0.1rem;

        flex-direction: row;
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

    flex-wrap: wrap;

    margin: 0 1rem;
    width: 100%;

    @media only screen and (max-width: 768px) {
    }
`;

const CommentContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: left;

    height: max-content;

    margin: 1rem;
    width: 90%;
`;

const CommentScroll = styled.div`
    width: 100%;

    padding-bottom: 0.25rem;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 768px) {
        margin-top: 1rem;
    }
`;

const ContentsInfo = styled.div`
    /* h-1/4 flex flex-col justify-around */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;

    min-height: 30%;

    @media only screen and (max-width: 768px) {
        min-width: 30%;
        height: 100%;
    }
`;
const CommentsInfo = styled.div`
    /* " h-3/4 w-full flex flex-col justify-between" */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 70%;

    @media only screen and (max-width: 768px) {
        width: 70%;
        height: 100%;
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
    history,
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

    //! user comments
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const userId = useSelector((state) => state.userReducer?.userData?._id);

    const [newComments, setNewComments] = useState();

    const dispatchProductComment = async (commentInfo) => {
        const res = await dispatch(addProductComment(commentInfo));
        if (res.payload.addCommentSuccess) {
            //! 업데이트 된 댓글들을 api로부터 받아와 다시 렌더링.
            dispatchReadProductComment();
        }
    };

    const handleCommentSubmit = (input, e) => {
        e.preventDefault(); // Submit 의 리로딩 작업을 막음.
        const { comment } = input;
        if (userId) {
            //! 유저 아이디 조회 가능 = 로그인 상태.
            const commentInfo = {
                product_id: _id,
                user_id: userId,
                comment,
            };
            dispatchProductComment(commentInfo);
            e.target.reset(); // 인풋 값 초기화.
        } else {
            alert("Login Please👋!");
            history.push("/login"); //login 창으로 이동.
        }
    };

    const dispatchReadProductComment = useCallback(async () => {
        const res = await dispatch(
            readProductComment({
                product_id: _id,
            })
        );
        setNewComments(res?.payload?.comments);
    }, [_id, dispatch]);

    useEffect(() => {
        if (toggle) dispatchReadProductComment();
        //! 초기 댓글 설정.
    }, [toggle]);

    return (
        <Container toggle={toggle} className={"rounded-lg shadow-md"}>
            <PictureContainer>
                <Background
                    alt="thumbnail-img"
                    src={`http://localhost:5000/${thumbnailPath}`}
                />
                <ContentContainer className={"border-gray-300"}>
                    <ContentsInfo>
                        <p className={"mt-2 ml-4 md:mt-12 text-xl"}>{title}</p>
                        <p className={"m-4"}>{description}</p>
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
                    </ContentsInfo>
                    <CommentsInfo>
                        <CommentScroll>
                            {newComments &&
                                newComments.map(
                                    (
                                        {
                                            comment,
                                            comment_date,
                                            user_id: { name, profilePath, _id },
                                        },
                                        idx
                                    ) => (
                                        <CommentBox
                                            key={idx}
                                            comment={comment}
                                            commentDate={comment_date}
                                            userId={_id}
                                            userName={name}
                                            userImgPath={profilePath}
                                        />
                                    )
                                )}
                        </CommentScroll>
                        <CommentContainer
                            onSubmit={handleSubmit(handleCommentSubmit)}
                        >
                            <Input
                                type="text"
                                name="comment"
                                ref={register}
                                placeholder="comments here..."
                                isUploadPage={true}
                                maxLength="20"
                                minLength="2"
                                isSpecificProduct={true}
                            />
                        </CommentContainer>
                    </CommentsInfo>
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
                        <Link to={`user${writer?._id}`}>by {writer?.name}</Link>
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

            <ExitBtn onClick={() => toggleBar(toggle)} />
        </Container>
    );
}

export default withRouter(LandingSpecificBox);
