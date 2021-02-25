import { set } from "mongoose";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { AddToCart, Delete, VideoTime } from "../assets/iconComponents";
import ExitBtn from "../utils/ExitBtn";
import useToggleBar from "../utils/hooks/useToggleBar";
import MainLogo from "../utils/MainLogo";
import {
    deleteCartItem,
    readCartItem,
    resetCartItem,
} from "../_action/add_to_cart_action";

const CartBtn = styled.button`
    z-index: 0;
    transition: all ease-out 0.2s;

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
    transition: all ease-in 0.2s;

    position: relative;
    right: 0;
    bottom: 0;

    width: 3rem;
    height: 1.5rem;

    margin: 0.25rem;

    color: white;

    font-size: 0.75rem;

    &:active,
    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(1.1);
    }
`;

function Cart() {
    const [toggleBar, toggle] = useToggleBar(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalTime, setTotalTime] = useState(0);

    const handleDelete = (product_id) => {
        const deletedItem = deleteCartItem(product_id);
        setCartItems(deletedItem);
        const timeSum = deletedItem.reduce((prev, next) => {
            return prev + next.playTime;
        }, 0);

        setTotalTime(timeSum);
    };

    const handleReset = () => {
        resetCartItem();
        setCartItems([]);
        setTotalTime(0);
    };

    useEffect(() => {
        if (toggle) {
            const items = readCartItem();
            setCartItems(items);
            if (items) {
                const timeSum = items.reduce((prev, next) => {
                    return prev + next.playTime;
                }, 0);

                setTotalTime(timeSum);
            }
        }
    }, [toggle]);

    return (
        <>
            {!toggle ? (
                <CartBtn
                    onClick={() => toggleBar(toggle)}
                    className={"rounded-full border-green-200"}
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
                        <p className={"text-sm text-gray-400 font-extralight"}>
                            Total Add Time {totalTime}
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
                                        onClick={() => handleDelete(product_id)}
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
                            onClick={handleReset}
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
