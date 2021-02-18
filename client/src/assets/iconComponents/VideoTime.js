import React from "react";

function VideoTime(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.11304 0.5H9.9051C12.3271 0.5 14.0181 2.16904 14.0181 4.56091V11.4391C14.0181 13.831 12.3271 15.5 9.9051 15.5H4.11304C1.69102 15.5 0 13.831 0 11.4391V4.56091C0 2.16904 1.69102 0.5 4.11304 0.5ZM17.958 2.87898C18.397 2.65563 18.912 2.67898 19.331 2.94294C19.75 3.20589 20 3.66274 20 4.16223V11.8384C20 12.3389 19.75 12.7947 19.331 13.0577C19.102 13.2008 18.846 13.2739 18.588 13.2739C18.373 13.2739 18.158 13.2231 17.957 13.1206L16.476 12.3734C15.928 12.0952 15.588 11.5369 15.588 10.9165V5.08305C15.588 4.46173 15.928 3.90335 16.476 3.62721L17.958 2.87898Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default VideoTime;
