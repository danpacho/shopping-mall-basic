import { useState } from "react";

function useToggleBar() {
    const [toggle, setToggle] = useState(false);

    const toggleBar = (arg) => {
        setToggle(!arg);
    };

    return [toggleBar, toggle];
}

export default useToggleBar;
