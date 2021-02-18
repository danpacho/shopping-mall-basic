import styled, { keyframes } from "styled-components";

const Loading = styled.div`
    .loader,
    .loader:before,
    .loader:after {
        background: #333333;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }
    .loader {
        color: #333333;
        text-indent: -9999em;
        margin: 88px auto;
        position: relative;
        font-size: 11px;
        transform: translateZ(0);
        animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
        position: absolute;
        top: 0;
        content: "";
    }
    .loader:before {
        left: -1.5em;
        animation-delay: -0.32s;
    }
    .loader:after {
        left: 1.5em;
    }
    @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }
`;

function Loader() {
    return <Loading className={"loader h-1/2 w-full"} />;
}

export default Loader;