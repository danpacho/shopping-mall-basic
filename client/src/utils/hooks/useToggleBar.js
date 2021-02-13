import { useState } from "react";

function useToggleBar() {
    const [toggle, setToggle] = useState(false);

    const toggleBar = (arg) => {
        setToggle(!arg);
    };

    return [toggleBar, toggle];
}

//! use:
//! get return elem by const [a,b] = useToggleBar();
//! toggle 엘리먼트에 대해 이벤트={()=>a(b)}
//! hide 하고자 하는 곳에 스타일 컴포넌트로 속성 b를 전달하여 조건부 렌더링.

export default useToggleBar;
