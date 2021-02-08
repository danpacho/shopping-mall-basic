import * as React from "react";

function SvgStar(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.918 12.32a1.1 1.1 0 00-.319.97l.89 4.92a1.08 1.08 0 01-.45 1.08 1.1 1.1 0 01-1.17.08l-4.43-2.31a1.13 1.13 0 00-.5-.13h-.27a.812.812 0 00-.27.09l-4.43 2.32c-.22.11-.468.15-.71.11a1.112 1.112 0 01-.89-1.27l.89-4.92a1.119 1.119 0 00-.32-.98L.33 8.78a1.08 1.08 0 01-.27-1.13c.134-.396.476-.685.89-.75l4.97-.72c.377-.04.71-.27.88-.61l2.19-4.49c.051-.1.118-.192.2-.27l.09-.07a.671.671 0 01.16-.13l.11-.04.17-.07h.42c.376.04.707.264.88.6l2.22 4.47c.16.327.47.554.83.61l4.97.72c.42.06.77.35.91.75.13.401.017.841-.29 1.13l-3.74 3.54z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgStar;
