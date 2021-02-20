import React from "react";

function VideoTime(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.816 11.6204C14.816 13.6134 13.458 15.0214 11.286 15.0214H5.06905C2.89905 15.0214 1.55005 13.6134 1.55005 11.6204V4.66043C1.55005 2.66843 2.89905 1.25043 5.08005 1.25043H11.286C13.458 1.25043 14.816 2.66843 14.816 4.66043V11.6204Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.8162 7.2766L18.9132 3.9226C19.5632 3.3876 20.5502 3.8526 20.5502 4.6996V11.5716C20.5502 12.4196 19.5632 12.8826 18.9132 12.3486L14.8162 8.9946"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default VideoTime;
