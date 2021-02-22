import { HashRouter as Router, Route } from "react-router-dom";

import Auth from "../higerOrderComponents/Auth";
import Account from "../routes/login_user/AccountPage";
import Admin from "../routes/admin/AdminPage";

import Home from "../routes/HomePage";
import Login from "../routes/LoginPage";
import Register from "../routes/RegisterPage";
import Setting from "../routes/login_user/SettingPage";
import UploadFile from "../routes/login_user/UploadFilePage";
import UserPosts from "../routes/UserPostsPage";
import PostsLikes from "../routes/login_user/PostsLikesPage";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Auth(Home, true)} />
            <Route
                exact
                path="/user:id"
                component={Auth(UserPosts, true, true)}
            />
            <Route exact path="/login" component={Auth(Login, true)} />
            <Route exact path="/register" component={Auth(Register, true)} />
            <Route exact path="/account" component={Auth(Account, false)} />
            <Route exact path="/upload" component={Auth(UploadFile, false)} />
            <Route exact path="/settings" component={Auth(Setting, false)} />
            <Route exact path="/likes" component={Auth(PostsLikes, false)} />

            <Route exact path="/admin" component={Auth(Admin, false, true)} />
        </Router>
    );
}

export default App;
