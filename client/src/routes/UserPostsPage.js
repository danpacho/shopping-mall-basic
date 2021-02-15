import { useSelector } from "react-redux";
//-------------------------------------------------------------------------------------------
import { Link, useParams, withRouter } from "react-router-dom";
//-------------------------------------------------------------------------------------------
import LandingPage from "../components/LandingPage";
//-------------------------------------------------------------------------------------------
import { UserDemo } from "../assets/iconComponents";
//-------------------------------------------------------------------------------------------
import { CONFIG_BOX_DEFAULT_STYLE } from "../utils/ClassName";
//-------------------------------------------------------------------------------------------
import Container from "../utils/Container";
import Header from "../utils/Header";
import useSpecificUserProducts from "../utils/hooks/useSpecificUserProducts";
import MainLogo from "../utils/MainLogo";
import ProfileImageContainer from "../utils/ProfileImageContainer";
import UserConfigContainer from "../utils/UserConfigContainer";
import { List, UserConfigLists } from "../utils/UserConfigLists";
//-------------------------------------------------------------------------------------------

function UserPostsPage() {
    const { id } = useParams();
    const [products, user] = useSpecificUserProducts(id);
    return (
        <Container isMainPahe={true}>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>
            <UserConfigContainer className={CONFIG_BOX_DEFAULT_STYLE}>
                {!user?.profilePath ? (
                    <UserDemo width={"5rem"} height={"5rem"} />
                ) : (
                    <ProfileImageContainer
                        alt="profile-img"
                        src={`http://localhost:5000/${user?.profilePath}`}
                        isSpecificUser={true}
                    />
                )}
                {user && (
                    <UserConfigLists>
                        <List isTitle={true}>닉네임</List>
                        <List isConfig={true}>{user?.name}</List>
                        <List isTitle={true}>이메일</List>
                        <List isConfig={true}>{user?.email}</List>{" "}
                    </UserConfigLists>
                )}
            </UserConfigContainer>

            <LandingPage products={products} />
        </Container>
    );
}

export default withRouter(UserPostsPage);
