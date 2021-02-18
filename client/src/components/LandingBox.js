import React, { useCallback, useEffect, useState } from "react";
//----------------------------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//----------------------------------------------------------------------------------
import styled from "styled-components";
//----------------------------------------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//----------------------------------------------------------------------------------
import { BOX_DEFAULT_STYLE, TAG_STYLE } from "../utils/ClassName";
import ProfileImageContainer from "../utils/ProfileImageContainer";
import { Tag, Tags } from "../utils/TagContainer";
//----------------------------------------------------------------------------------
import {
    AddToCart,
    Download,
    FillHeart,
    Heart,
    UserDemo,
} from "../assets/iconComponents/index";
//----------------------------------------------------------------------------------
import {
    updateProductLowerLike,
    updateProductUpperLike,
} from "../_action/update_user_post_action";
//----------------------------------------------------------------------------------
import useToggleBar from "../utils/hooks/useToggleBar";
import LandingSpecificBox from "./LandingSpecificBox";
import useTagsFilter from "../utils/hooks/useTagsFilter";
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

    color: #262626;

    &:hover {
        transform: translateY(-0.1rem);
    }
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
        opacity: 0.95;
    }
`;
//---------------------------------------------------------------

function LandingBox({ product, history }) {
    const dispatch = useDispatch();
    const [toggleBar, toggle] = useToggleBar();

    const {
        _id,
        title,
        tags,
        likes,
        download,
        thumbnailPath,
        writer,
    } = product;

    const newTags = useTagsFilter(tags);

    const userId = useSelector((state) => state.userReducer?.userData?._id);
    const userPostsLikes = useSelector(
        (state) => state.userReducer?.userData?.postsLikes
    );

    const [renderLike, setRenderLike] = useState(likes);
    const [like, setLike] = useState(false);
    const [dislike, setDisLike] = useState(false);

    const setUserLikeIcon = useCallback(async (userId, postsLikes) => {
        //! 비로그인 유저는 userData 접근 불가능.
        if (postsLikes === undefined) {
            setDisLike(true);
        } else {
            const criterion = await postsLikes?.filter(
                (productUserId) => productUserId === userId
            );
            if (criterion.length === 0) setDisLike(true);
            else setLike(true);
        }
    }, []);

    const dispatchUpperLike = useCallback(async () => {
        if (userId !== undefined) {
            const upperLikeData = {
                product_id: _id,
                user_id: userId,
            };
            const res = await dispatch(updateProductUpperLike(upperLikeData));
            if (res.payload.updateLikePostSuccess) {
                setDisLike(false);
                setLike(true);
                setRenderLike(renderLike + 1);
            } else alert("update failed😢.");
        } else {
            history.push("/login");
        }
    }, [_id, dispatch, history, renderLike, userId]);

    const dispatchLowerLike = useCallback(async () => {
        if (userId !== undefined) {
            const lowerLikeData = {
                product_id: _id,
                user_id: userId,
            };
            const res = await dispatch(updateProductLowerLike(lowerLikeData));
            if (res.payload.updateLikePostSuccess) {
                setDisLike(true);
                setLike(false);
                setRenderLike(renderLike - 1);
            } else alert("update failed😢.");
        } else {
            history.push("/login");
        }
    }, [_id, dispatch, history, renderLike, userId]);

    useEffect(() => {
        setUserLikeIcon(_id, userPostsLikes);
    }, []);

    return (
        <>
            <BoxModel
                className={"container rounded shadow-sm hover:shadow"}
                onClick={() => toggleBar(toggle)}
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
                                <AddToCart
                                    width={"1.75em"}
                                    height={"1.75em"}
                                    className={
                                        "hover:text-yellow-300 transition-all ease-in-out duration-200"
                                    }
                                />
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
                                    <UserDemo
                                        width={"1.5rem"}
                                        height={"1.5rem"}
                                    />
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
            {toggle && (
                <LandingSpecificBox
                    product={product}
                    toggle={toggle}
                    like={like}
                    dislike={dislike}
                    dispatchLowerLike={dispatchLowerLike}
                    dispatchUpperLike={dispatchUpperLike}
                    renderLike={renderLike}
                />
            )}
        </>
    );
}

export default withRouter(LandingBox);
