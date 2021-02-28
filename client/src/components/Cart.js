//----------------------------------------------------------------------
import styled from "styled-components";
//----------------------------------------------------------------------
import { AddToCart, Delete, VideoTime } from "../assets/iconComponents";
//----------------------------------------------------------------------
import ExitBtn from "../utils/ExitBtn";
import useToggleBar from "../utils/hooks/useToggleBar";
import MainLogo from "../utils/MainLogo";
//----------------------------------------------------------------------
import {
    deleteCartItem,
    readCartItem,
    resetCartItem,
} from "../context/add_to_cart_action";
//----------------------------------------------------------------------
import { useCallback, useEffect, useState } from "react";
import useCartDispatch from "../context/useCartDispatch";
import useCartState from "../context/useCartState";
import {
    ADD_CART_ITEM,
    DELETE_CART_ITEM,
    GET_CART_ITEM,
    RESET_CART_ITEM,
} from "../context/cart_types";
//----------------------------------------------------------------------

const CartBtn = styled.button`
    z-index: 0;
    transition: all ease-out 0.1s;

    position: fixed;
    bottom: 3.5rem;
    right: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 3.5rem;
    height: 3.5rem;

    border-width: 0.25rem;

    cursor: pointer;

    font-size: 1.5rem;
    color: white;
    background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);

    &:hover {
        transform: scale(1.25);
        background: white;
        border-width: 0.1rem;
        color: green;
    }

    &:active,
    &:focus {
        outline: none;
        transform: scale(1.1);
    }
`;

const CartContainer = styled.div`
    z-index: 0;
    transition: all ease-out 0.2s;

    position: fixed;
    bottom: 3.5rem;
    right: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 16rem;
    height: min-content;
    min-height: 10rem;

    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(30px);
    border-width: 0.1rem;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    @keyframes scale-up-ver-center {
        0% {
            -webkit-transform: scaleY(0.35);
            transform: scaleY(0.35);
        }
        100% {
            -webkit-transform: scaleY(1);
            transform: scaleY(1);
        }
    }

    animation: scale-up-ver-center 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;

    @media only screen and (max-width: 768px) {
        width: 12rem;
        height: 15rem;
    }
`;

const CartBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 2rem;
    min-height: 2rem;

    margin: 0.1rem 0;

    font-size: 0.85rem;

    cursor: pointer;

    user-select: none;
`;

const DeleteBtn = styled.button`
    transition: all ease-in-out 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 0.25rem;

    &:active,
    &:focus {
        outline: none;
    }

    &:hover {
        color: tomato;
    }
`;

const ResetBtn = styled.button`
    transition: all ease-out 0.1s;

    width: 2.5rem;
    height: 1.25rem;

    margin: 0.25rem;

    color: white;

    font-size: 0.75rem;

    &:active,
    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(1.05);
    }
`;

//----------------------------------------------------------------------

function Cart({ userLoginState }) {
    const [toggleBar, toggle] = useToggleBar(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalTime, setTotalTime] = useState(0);

    //for dispatch context api
    const dispatch = useCartDispatch();

    const getTimeSum = (item) =>
        item.reduce((prev, next) => {
            return prev + next.playTime;
        }, 0);

    const dispatchDelete = async (product_id) => {
        const deletedItem = await deleteCartItem(product_id);
        dispatch(deletedItem);
    };

    const dispatchReset = async () => dispatch(await resetCartItem());

    useEffect(() => {
        //처음에 카트 아이템을 불러온다.
        dispatch(readCartItem());
    }, []);

    const cartItem = useCartState();

    const setItemsByActionType = useCallback((items) => {
        // 아이템 동작 type에 따라서 item을 다시 set한다.
        switch (items.type) {
            case GET_CART_ITEM:
                setCartItems(items?.getItems);
                setTotalTime(getTimeSum(items?.getItems));
                return "";

            case ADD_CART_ITEM:
                setCartItems(items?.addItems);
                setTotalTime(getTimeSum(items?.addItems));
                return "";

            case DELETE_CART_ITEM:
                setCartItems(items?.deleteItems);
                setTotalTime(getTimeSum(items?.deleteItems));
                return "";

            case RESET_CART_ITEM:
                setCartItems([]);
                setTotalTime(0);
                return "";

            default:
                return "";
        }
    }, []);

    useEffect(() => {
        setItemsByActionType(cartItem);
    }, [cartItem, setItemsByActionType]);

    const handleOpen = async () => {
        if (await userLoginState) toggleBar(toggle);
        else alert("logIn please!");
    };

    return (
        <>
            {!toggle ? (
                <CartBtn
                    className={"rounded-full border-green-200"}
                    onClick={handleOpen}
                >
                    <AddToCart />
                </CartBtn>
            ) : (
                <CartContainer
                    className={
                        "rounded-xl shadow-sm hover:shadow border-gray-300 border-opacity-50"
                    }
                >
                    <div
                        className={"flex flex-col items-center justify-center"}
                    >
                        <MainLogo isCart={true}>Your Cart</MainLogo>
                        <ExitBtn onClick={() => toggleBar(toggle)} />
                        <p className={"text-sm text-gray-500 font-extralight"}>
                            Total Add Time {totalTime}s 😎
                        </p>
                    </div>

                    {cartItems &&
                        cartItems.map(({ title, playTime, product_id }) => (
                            <CartBox
                                key={product_id}
                                className={
                                    "shadow-sm border-l-4 border-green-500 border-opacity-80 "
                                }
                            >
                                <div
                                    className={
                                        "ml-2 flex flex-row items-center"
                                    }
                                >
                                    <DeleteBtn
                                        onClick={() =>
                                            dispatchDelete(product_id)
                                        }
                                    >
                                        <Delete />
                                    </DeleteBtn>
                                    <p>{title}</p>
                                </div>
                                <p
                                    className={
                                        "mr-2 flex flex-row  items-center justify-center gap-1 text-gray-500"
                                    }
                                >
                                    {playTime}s
                                    <VideoTime />
                                </p>
                            </CartBox>
                        ))}
                    {cartItems && cartItems.length !== 0 && (
                        <ResetBtn
                            className={"rounded shadow-sm bg-red-400 "}
                            onClick={dispatchReset}
                        >
                            Reset
                        </ResetBtn>
                    )}
                </CartContainer>
            )}
        </>
    );
}

export default Cart;
