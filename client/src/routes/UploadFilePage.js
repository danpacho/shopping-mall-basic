import { Link } from "react-router-dom";
//------------------------------------------------
import Container from "../utils/Container";
import Header from "../utils/Header";
import MainLogo from "../utils/MainLogo";
//------------------------------------------------

function UploadFilePage() {
    return (
        <Container>
            <Header>
                <MainLogo>
                    <Link to="/">Note Share</Link>
                </MainLogo>
            </Header>
        </Container>
    );
}

export default UploadFilePage;
