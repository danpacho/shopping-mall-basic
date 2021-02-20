import React from "react";
import styled, { css } from "styled-components";

const ProfileImage = styled.img`
    transition: all ease-out 0.2s;

    width: auto;
    height: 8.5rem;

    max-width: 8.5rem;
    max-height: 8.5rem;

    border-width: 0.1rem;

    object-fit: cover;

    ${(props) => props.isSpecificUser && "0.5rem"};

    ${(props) =>
        props.isLittleCircle &&
        css`
            height: 2rem;
            width: auto;

            max-height: 2rem;
            max-width: 2rem;
        `}
`;

const PROFILE_CONTAINER_STYLE =
    "rounded-full shadow-sm hover:shadow border-gray-300 hover:border-green-500 hover:border-opacity-70 select-none";

export default function ProfileImageContainer({
    alt,
    src,
    isSpecificUser = false,
    isLittleCircle = false,
}) {
    return (
        <ProfileImage
            alt={alt}
            src={src}
            isSpecificUser={isSpecificUser}
            isLittleCircle={isLittleCircle}
            className={PROFILE_CONTAINER_STYLE}
        />
    );
}
