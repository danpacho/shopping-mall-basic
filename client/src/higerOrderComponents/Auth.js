import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../_action/user_action";
//-------------------------------------------------------

export default function Auth(
    SpecificComponent,
    beforeLogInPage,
    alwaysAccessPage = false,
    adminRoute = null
) {
    //! beforeLogInPage 인자에 따른 라우팅.

    // 1. true => 페이지 접근 가능.
    // 2. false => 페이지 접근 불가능.
    // 3. null => 모든 유저가 접근 가능.

    const dispatch = useDispatch();

    const fetchingData = useCallback(
        async (url) => {
            //! 로그아웃 상태
            const { payload } = await dispatch(authUser());
            if (!payload.isAuth) {
                !beforeLogInPage && url.history.push("/");
            }
            //! 로그인 상태
            else {
                if (adminRoute && !payload.isAdmin) url.history.push("/");
                beforeLogInPage && !alwaysAccessPage && url.history.push("/");
            }
        },
        [adminRoute, dispatch, beforeLogInPage, alwaysAccessPage]
    );

    function PaginationUser(url) {
        useEffect(() => {
            fetchingData(url);
        }, []);
        return <SpecificComponent />;
    }

    return PaginationUser;
}
