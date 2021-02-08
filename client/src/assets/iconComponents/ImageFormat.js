import * as React from "react";

function SvgImageFormat(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14 20H2a2 2 0 01-2-2V2a2 2 0 012-2h7a.105.105 0 01.027 0h.006l.029.006c.088.006.175.023.259.051H9.363A.423.423 0 019.415.1a.987.987 0 01.293.2l6 6a.987.987 0 01.2.293.735.735 0 01.023.066l.01.028c.028.083.044.17.049.258a.1.1 0 00.007.029v.006A.112.112 0 0116 7v11a2 2 0 01-2 2zm-9-6l-3 4h12l-5-7-3 4-1-1zm-.5-5A1.5 1.5 0 106 10.578v.29-.368A1.5 1.5 0 004.5 9zM9 2v5h5L9 2z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgImageFormat;
