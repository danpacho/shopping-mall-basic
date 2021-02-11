import React from "react";

function AddToCart(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 43 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M40.3125 50H2.6875C1.20323 50 0 48.7956 0 47.3098V21.3687C0.0416325 20.7094 0.32153 20.0879 0.787437 19.6201L19.5999 0.788987C20.104 0.283837 20.788 0 21.5013 0C22.2146 0 22.8987 0.283837 23.4027 0.788987L42.2152 19.6201C42.7198 20.1239 43.0023 20.8086 43 21.522V47.3098C43 48.7956 41.7967 50 40.3125 50ZM21.5 6.49481L5.375 22.6357V44.6197H37.625V22.6357L21.5 6.49481ZM24.1875 39.2367H18.8125V31.1662H10.75V25.7859H18.8125V17.7154H24.1875V25.7859H32.25V31.1662H24.1875V39.2367Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default AddToCart;
