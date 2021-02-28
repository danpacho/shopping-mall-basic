import React, { useCallback, useEffect, useState } from "react";
//----------------------------------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
//----------------------------------------------------------------------------------
import styled from "styled-components";
//----------------------------------------------------------------------------------
import { Link, withRouter } from "react-router-dom";
//----------------------------------------------------------------------------------
import {
    BOX_DEFAULT_STYLE,
    CONFIG_BTN_STYLE,
    CONFIG_ERR_BTN_STYLE,
    TAG_STYLE,
} from "../utils/ClassName";
//----------------------------------------------------------------------------------
import ProfileImageContainer from "../utils/ProfileImageContainer";
import { Tag, Tags } from "../utils/TagContainer";
import ConfigButton from "../utils/ConfigButton";
import Err from "../utils/Err";
//----------------------------------------------------------------------------------
import {
    AddToCart,
    Delete,
    Download,
    FillHeart,
    Heart,
    UserDemo,
} from "../assets/iconComponents/index";
//----------------------------------------------------------------------------------
import {
    deleteProduct,
    updateProductLowerLike,
    updateProductUpperLike,
    updateProductViews,
} from "../_action/update_user_post_action";
//----------------------------------------------------------------------------------
import LandingSpecificBox from "./LandingSpecificBox";
//----------------------------------------------------------------------------------
import useToggleBar from "../utils/hooks/useToggleBar";
import useTagsFilter from "../utils/hooks/useTagsFilter";
import useNotificationBar from "../utils/hooks/useNotificationMessage";
//----------------------------------------------------------------------------------
import { addCartItem } from "../context/add_to_cart_action";
import useCartDispatch from "../context/useCartDispatch";
import useCartState from "../context/useCartState";
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

    font-family: ${(props) => !props.isLandingPage && "Do Hyeon, sans-serif"};
    font-size: 1.25rem;
`;

const Contents = styled.div`
    width: 100%;

    border-top-width: 0.1rem;
`;

const BackgroundImg = styled.div`
    overflow: hidden;

    height: 100%;
    max-height: 16.5rem;

    width: 100%;

    background: transparent;

    user-select: none;
`;

const BackgroundImgContainer = styled.img`
    transition: all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);

    height: inherit;
    max-height: inherit;

    width: inherit;

    user-select: none;
    object-fit: contain;

    &:hover {
        transform: scale(1.25);
        opacity: 0.85;
    }
`;

const DeleteBtn = styled.div`
    transition: all ease-in-out 0.2s;

    position: absolute;
    top: 0;
    right: 0;

    padding: 0.5rem;
    margin-right: 0.5rem;

    color: #000;

    &:hover {
        color: tomato;
    }
`;

const WarningPage = styled.div`
    z-index: 10;

    transition: all ease-in-out 0.2s;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 50%;
    height: 70%;

    font-size: 1rem;

    background: white;
`;

const ModalBackground = styled.div`
    z-index: 4;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(25px);

    display: ${(props) => (props.warningToggle ? "block" : "none")};
`;

//---------------------------------------------------------------

function LandingBox({ product, history, isAccountPage }) {
    const dispatch = useDispatch();
    const [toggleBar, toggle] = useToggleBar();
    const [setWarningToggleBar, warningToggle] = useToggleBar();

    const {
        _id,
        title,
        tags,
        likes,
        download,
        thumbnailPath,
        writer,
        views,
        playTime,
    } = product;

    const newTags = useTagsFilter(tags);

    const userId = useSelector((state) => state.userReducer?.userData?._id);
    const userPostsLikes = useSelector(
        (state) => state.userReducer?.userData?.postsLikes
    );

    //! 좋아요 갯수 초기 표시

    const [renderLike, setRenderLike] = useState(likes);

    //! 좋아요, 싫어요 dispatch

    const [like, setLike] = useState(false);
    const [dislike, setDisLike] = useState(false);

    //! 처음 렌더시 유저 상태에 따른 좋아요 싫어요 렌더링.

    const setUserLikeIcon = useCallback((userId, postsLikes) => {
        //! 비로그인 유저는 userData 접근 불가능.
        if (!userId) {
            setLike(false);
            setDisLike(true);
        } else {
            if (!postsLikes) {
                setLike(false);
                setDisLike(true);
            } else {
                const criterion = postsLikes?.filter(
                    (productUserId) => productUserId === userId
                );
                if (criterion.length === 0) setDisLike(true) && setLike(false);
                else setLike(true) && setDisLike(false);
            }
        }
    }, []);

    //! 좋아요, 싫어요 dispatch server

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

    //! update views

    const [view, setViews] = useState(views);

    const dispatchProductViews = async (productId) => {
        const res = await dispatch(updateProductViews(productId));
        if (res.payload.updateViewsSuccess) setViews(res.payload.views);
    };

    const updateViews = useCallback(() => {
        if (_id) {
            const productId = {
                product_id: _id,
            };
            dispatchProductViews(productId);
        }
    }, []);

    const handleBoxOpen = () => {
        //! 박스를 열때 조회수 업데이트
        toggleBar(toggle);
        updateViews();
    };

    useEffect(() => {
        setUserLikeIcon(_id, userPostsLikes);
    }, [_id, setUserLikeIcon, userPostsLikes]);

    //! 게시물 삭제

    const deleteSuccessMessage = useNotificationBar("Delete Success 😎!");
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const dispatchDeleteProduct = async (productId) => {
        const res = await dispatch(deleteProduct(productId));
        if (res.payload.deleteProductSuccess) {
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
                window.location.reload();
            }, 3000);
        } else {
            alert("delete failed😢.");
        }
    };

    const handleDeleteClick = () => {
        if (_id) {
            const productId = {
                product_id: _id,
            };
            dispatchDeleteProduct(productId);

            setWarningToggleBar(warningToggle);
        }
    };

    //!카트에 아이템 담기

    const dispatchCart = useCartDispatch();

    const handleAddCartItem = async () => {
        const cartItem = [
            {
                product_id: _id,
                title,
                playTime,
            },
        ];
        dispatchCart(await addCartItem(cartItem));
    };

    return (
        <>
            <BoxModel className={"container rounded-sm shadow-sm hover:shadow"}>
                <Title isLandingPage={true} className={"bg-gray-50"}>
                    {title}
                </Title>

                <BackgroundImg onClick={handleBoxOpen}>
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
                            "w-full h-12 flex flex-row items-center justify-between"
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

                            {!isAccountPage && (
                                <Tag
                                    isInteraction={true}
                                    onClick={handleAddCartItem}
                                >
                                    <AddToCart
                                        width={"1.75em"}
                                        height={"1.75em"}
                                        className={
                                            "hover:text-yellow-300 transition-all ease-in-out duration-200"
                                        }
                                    />
                                </Tag>
                            )}
                        </Tags>
                        <Tags>
                            <Tag isInteraction={true}>
                                {writer?.name && (
                                    <Link to={`user${writer?._id}`}>
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
                {isAccountPage && (
                    <DeleteBtn
                        onClick={() => setWarningToggleBar(warningToggle)}
                    >
                        <Delete width={"1.5em"} height={"1.5em"} />
                    </DeleteBtn>
                )}
            </BoxModel>

            {/*//! 삭제 모달창 */}
            <ModalBackground
                warningToggle={warningToggle}
                onClick={() => setWarningToggleBar(warningToggle)}
            >
                <WarningPage
                    className={
                        "rounded border-red-500 border-4 border-opacity-40 hover:border-opacity-80"
                    }
                >
                    <div
                        className={
                            "w-full h-full flex flex-col items-center justify-center"
                        }
                    >
                        <Err className={"text-red-500 text-opacity-80"}>
                            {title} 게시물을 <br /> 정말 삭제 하시겠습니까?
                        </Err>
                        <ConfigButton
                            isAccountPage={true}
                            className={`${CONFIG_BTN_STYLE} ${CONFIG_ERR_BTN_STYLE} mt-4`}
                            onClick={handleDeleteClick}
                        >
                            삭제 😢
                        </ConfigButton>
                        <Err
                            isAccountPage={true}
                            className={"text-gray-300 text-opacity-80"}
                        >
                            삭제된 게시물은 복구가 불가능합니다.
                            <br />
                            모든 책임은 사용자에게 있습니다.
                        </Err>
                    </div>
                </WarningPage>
            </ModalBackground>
            {deleteSuccess && deleteSuccessMessage}
            {/*//! 삭제 모달창 */}

            <LandingSpecificBox
                product={product}
                toggle={toggle}
                toggleBar={toggleBar}
                like={like}
                dislike={dislike}
                dispatchLowerLike={dispatchLowerLike}
                dispatchUpperLike={dispatchUpperLike}
                renderLike={renderLike}
                view={view}
            />
            {/* //! 카트 모달 창 */}
        </>
    );
}

export default withRouter(LandingBox);
