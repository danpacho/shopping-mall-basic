import React, { useCallback, useEffect, useState } from "react";
//----------------------------------------------------------------------------------
import { useSelector } from "react-redux";
//----------------------------------------------------------------------------------
import { Link } from "react-router-dom";
//----------------------------------------------------------------------------------
import useProductsInfo from "../../utils/hooks/useProductsInfo";
//----------------------------------------------------------------------------------
import LandingPage from "../../components/LandingPage";
//----------------------------------------------------------------------------------
import Container from "../../utils/Container";
import Header from "../../utils/Header";
import MainLogo from "../../utils/MainLogo";
//----------------------------------------------------------------------------------
import { FillHeart } from "../../assets/iconComponents";
//----------------------------------------------------------------------------------

function PostsLikesPage() {
    const [filterdProducts, setFilterdProducts] = useState([]);
    const products = useProductsInfo();

    const postsLikes = useSelector(
        (state) => state.userReducer.userData?.postsLikes
    );

    const userId = useSelector((state) => state.userReducer.userData?._id);

    const filterLikesPosts = useCallback((products, postsLikes, userId) => {
        //! postsLikes && userId 조건을 붙여서 두가지 값이 읽혀지기전에는 실행 불가. [중요]

        if (postsLikes && userId) {
            let arr = [];
            postsLikes.forEach((postId) =>
                products.forEach((product) => {
                    product._id === postId &&
                        userId !== product.writer._id &&
                        arr.push(product);
                })
            );
            setFilterdProducts(arr);
        }
    }, []);

    useEffect(() => {
        filterLikesPosts(products, postsLikes, userId);
    }, [postsLikes, products, userId, filterLikesPosts]);

    return (
        <Container isMainPage={true}>
            <Header>
                <MainLogo>
                    <Link to="/">
                        <p
                            className={
                                "flex flex-row w-max items-center justify-evenly"
                            }
                        >
                            Your Likes
                            <FillHeart className={"ml-4 text-red-400"} />
                        </p>
                    </Link>
                </MainLogo>
            </Header>
            <MainLogo isAccountPage={true} className={"mt-8"}>
                Likes
            </MainLogo>
            <LandingPage products={filterdProducts} />
        </Container>
    );
}

export default PostsLikesPage;
