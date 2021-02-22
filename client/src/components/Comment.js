//------------------------------------------------------------------------
import styled from "styled-components";
//------------------------------------------------------------------------
import { Link } from "react-router-dom";
//------------------------------------------------------------------------
import { UserDemo } from "../assets/iconComponents";
//------------------------------------------------------------------------
import { Tag } from "../utils/TagContainer";
import ProfileImageContainer from "../utils/ProfileImageContainer";
//------------------------------------------------------------------------

const CommentContainer = styled.div`
    transition: all ease-in-out 0.2s;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    height: fit-content;

    margin: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
    padding: 0.25rem 0;

    background: white;

    border-width: 0.1rem;

    &:hover {
        background: whitesmoke;
    }
`;

const UserContainer = styled.div`
    width: max-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;

    margin-left: 0.25rem;
`;

const CommentText = styled.p`
    margin-right: 1rem;

    font-size: 0.85rem;

    cursor: text;
`;

//------------------------------------------------------------------------

function CommentBox({ comment, userId, userName, userImgPath }) {
    return (
        <CommentContainer className={"rounded-sm shadow-sm"}>
            {userImgPath === "" ? (
                <Link to={`user${userId}`}>
                    <UserContainer>
                        <UserDemo width={"1.75rem"} height={"1.75rem"} />
                        <Tag isInteraction={true}>{userName}</Tag>
                    </UserContainer>
                </Link>
            ) : (
                <Link to={`user${userId}`}>
                    <UserContainer>
                        <ProfileImageContainer
                            alt="profile-img"
                            src={`http://localhost:5000/${userImgPath}`}
                            isSpecificUser={true}
                            isLittleCircle={true}
                        />
                        <Tag isInteraction={true}>{userName}</Tag>
                    </UserContainer>
                </Link>
            )}
            <CommentText>{comment}</CommentText>
        </CommentContainer>
    );
}

export default CommentBox;
