import * as React from "react";

function SvgArrowDownSquare(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                clipRule="evenodd"
                d="M5.666 19.25h8.669c3.02 0 4.915-2.139 4.915-5.166V5.916c0-3.027-1.885-5.166-4.915-5.166h-8.67C2.636.75.75 2.889.75 5.916v8.168c0 3.027 1.886 5.166 4.916 5.166z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 14.086V5.914M13.748 10.322L10 14.086l-3.748-3.764"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgArrowDownSquare;
