import { useState } from "react";

function useToggleBar(bool = false) {
    const [toggle, setToggle] = useState(bool);

    const toggleBar = (arg) => {
        setToggle(!arg);
    };

    return [toggleBar, toggle];
}

//! use: toggleBar과 toggle을 props로 전달해준다.

export default useToggleBar;
