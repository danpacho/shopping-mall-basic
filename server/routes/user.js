const express = require("express");
const router = express.Router();
//-------------------------------------------------
const { User } = require("../models/User");
//-------------------------------------------------
const { authUser } = require("../middleware/auth");
const multer = require("multer");
//-------------------------------------------------
const UPLOAD_DIR = "uploads/user_profile";
//-------------------------------------------------
const FILE_UPLOAD_URL = "/data/profile";
//!user 등록--------------------------------------------------------------------------------------------------

router.post("/register", (req, res) => {
    //회원가입 필요 정보 client에서 가져오면 데이터 베이스에 대입
    //req.body에 JSON 형태로 데이터가 들어있음
    const user = new User(req.body);
    const { email } = user;

    User.findOne({ email }, (err, isEmailExists) => {
        if (isEmailExists)
            return res.json({
                registerSuccess: false,
                message:
                    "입력하신 이메일은 이미 사용중입니다. 다른 이메일을 이용해주세요.",
                err,
            });
        else {
            //db에 저장 save()메서드

            user.save((err, userInfo) => {
                if (err)
                    return res.json({
                        registerSuccess: false,
                        message: "이메일과 비밀번호를 다시 확인해주세요.",
                        err,
                    });
                // 저장 성공시 200 신호 받음
                return res.status(200).json({
                    registerSuccess: true,
                    // userInfo,
                });
            });
        }
    });
});

//!user 로그인--------------------------------------------------------------------------------------------------

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    //1. 요청된 이메일을 데이터 베이스에 있는지 찾는다.

    User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "입력하신 이메일에 해당되는 계정이 존재하지 않습니다.",
                err,
            });
        }

        //2. 유저 존재 => 요청된 이메일이 데이터 베이스에 있다면 비밀번호 체크.
        else {
            user.comparePassword(password, (err, isMatch) => {
                //틀림.
                if (!isMatch)
                    return res.json({
                        loginSuccess: false,
                        message: "비밀번호가 옳지 않습니다.",
                        err,
                    });

                //3. 로그인 성공 => 비밀번호 확인 후 유저 JWT 토큰 생성.

                user.generateValidUserToken((err, user) => {
                    if (err) return res.status(400).send(err);

                    //토큰 저장. 보관 장소 : 쿠기 / 로컬 스토리지 / 등
                    //cookie-parser 라이브러리 이용

                    res.cookie("x_auth", user.token)
                        .status(200)
                        .json({ loginSuccess: true, userId: user._id, user });
                });
            });
        }
    });
});

//!Auth 이용하기 로그인 사용자의 쿠키 속 jwt를 통해 user.id를 구함 -> 서버와 비교하여 특정 페이지를 진입 가능한지 설정-------

router.get("/auth", authUser, (req, res) => {
    //! authuser 는 콜백을 실행하기전에 시행하는 미들웨어...
    // authUser가 문제없이 통과 -> 인증이 정상적으로 진행됨.
    const {
        _id,
        email,
        name,
        lastname,
        role,
        profilePath,
        postsLikes,
    } = req.user;

    res.set("Content-Type", "text/json");
    res.status(200).json({
        _id,
        isAdmin: role === 0 ? false : true,
        //! 1이면 관리자.
        isAuth: true,
        email,
        name,
        lastname,
        role,
        profilePath,
        postsLikes,
    });
});

//!user 로그아웃 쿠키 속 토큰을 통해 인증을 진행 => DB user 토큰만 지우면 로그아웃 상태로 복귀.--------------

router.get("/logout", authUser, (req, res) => {
    const { id } = req.user;

    User.updateOne(
        {
            _id: id,
        },
        {
            $set: {
                token: "",
            },
        },

        (err, user) => {
            if (err) return res.json({ logoutSuccess: false, err });

            return res.status(200).send({
                logoutSuccess: true,
            });
        }
    );
});

//!user info update -------------------------------------------------

router.patch("/update", (req, res) => {
    const { name, email } = req.body;

    User.findOneAndUpdate(
        {
            email,
        },
        {
            $set: {
                name: name,
            },
        },
        {
            new: true,
        },

        (err, user) => {
            if (err) return res.json({ uploadNameSuccess: false, err });

            return res.status(200).send({
                uploadNameSuccess: true,
            });
        }
    );
});

//! User profileImg save ----------------------------------------------

const dataStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${UPLOAD_DIR}`);
    },
    //destination: 파일 저장 위치
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadFile = multer({ storage: dataStorage }).single("file");

router.post(FILE_UPLOAD_URL, (req, res) => {
    // 가져온 이미지 저장 with multer

    uploadFile(req, res, (err) => {
        if (err) res.json({ uploadProfileSuccess: false, err });

        const { path, filename } = res.req.file;
        const { email } = res.req.body;

        User.updateOne(
            {
                email,
            },
            {
                $set: {
                    profilePath: path,
                },
            },
            (err, user) => {
                if (err) res.status(200).json({ err });
                return res.json({
                    uploadProfileSuccess: true,
                    filePath: path,
                    fileName: filename,
                });
            }
        );
    });
});

//-------------------------------------------------------------------

module.exports = router;
