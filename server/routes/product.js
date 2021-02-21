const express = require("express");
const router = express.Router();
//-----------------------------------------------------------------
const multer = require("multer");
const { Product } = require("../models/Product");
const { User } = require("../models/User");
//-----------------------------------------------------------------
const UPLOAD_DIR = "uploads/user_uploads";
const UPLOAD_THUMBNAIL_DIR = "uploads/user_uploads_thumbnail";
//-----------------------------------------------------------------
const FILE_UPLOAD_URL = "/data/file";
const THUMBNAIL_UPLOAD_URL = "/data/thumbnail";
//! save file ----------------------------------------------------------------

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
        if (err) res.json({ uploadSuccess: false, err });

        const { path, filename } = res.req.file;

        return res.json({
            uploadSuccess: true,
            filePath: path,
            fileName: filename,
        });
    });
});

//! save thumbnail -----------------------------------------------------------------

const thumbnailStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${UPLOAD_THUMBNAIL_DIR}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const uploadThumbnail = multer({ storage: thumbnailStorage }).single("file");

router.post(THUMBNAIL_UPLOAD_URL, (req, res) => {
    uploadThumbnail(req, res, (err) => {
        if (err) res.json({ uploadThumbnailSuccess: false, err });

        const { path, filename } = res.req.file;

        return res.json({
            uploadThumbnailSuccess: true,
            filePath: path,
            fileName: filename,
        });
    });
});

//! save total data -----------------------------------------------------------------

router.post("/", (req, res) => {
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ uploadComplete: false, err });
        return res.status(200).json({ uploadComplete: true });
    });
});

//! post total products -----------------------------------------------------------------

router.post("/products", (req, res) => {
    Product.find()
        .populate("writer")
        //! populate 메서드로 product 속 writer의 정보도 User Model 에서 가져옴.
        .exec((err, productInfo) => {
            if (err) res.status(400).json({ getProductsSuccess: false, err });

            res.status(200).json({ getProductsSuccess: true, productInfo });
        });
});

//! post specific user products ----------------------------------------------------------

router.post("/products/user", async (req, res) => {
    try {
        await Product.find()
            .where("writer")
            .equals(req.query.id)
            .populate("writer")
            .exec((err, productsInfo) => {
                if (err)
                    res.status(400).json({
                        getSpecificProductsSuccess: false,
                        err,
                    });
                res.status(200).json({
                    getSpecificProductsSuccess: true,
                    productsInfo,
                });
            });
    } catch (err) {
        res.status(400).json({ getSpecificProductsSuccess: false, err });
    }
});

//! modify products LIKE [ UP ] -----------------------------------------------------------------

router.patch("/products/update/like_up", (req, res) => {
    const { user_id, product_id } = req.body;

    // 유저 아이디, => likes 배열에 프로덕트 아이디 추가

    // 프로덕트 아이디 => 해당 프로덕트 like를 업데이트
    Product.updateOne(
        {
            _id: product_id,
        },
        {
            $inc: {
                likes: 1,
            },
        },

        (err, user) => {
            if (err) return res.status(400).json({ err });

            return res.status(200);
        }
    );

    User.updateOne(
        {
            _id: user_id,
        },
        {
            $push: {
                postsLikes: product_id,
            },
        },
        (err, user) => {
            if (err)
                return res
                    .status(400)
                    .json({ updatePostLikeSuccess: false, err });

            return res.status(200).send({
                updateLikePostSuccess: true,
            });
        }
    );
});

//! modify products LIKE [ DOWN ] -----------------------------------------------------------------

router.patch("/products/update/like_down", (req, res) => {
    const { user_id, product_id } = req.body;

    Product.updateOne(
        {
            _id: product_id,
        },
        {
            $inc: {
                likes: -1,
            },
        },

        (err, user) => {
            if (err) return res.status(400).json({ err });

            return res.status(200);
        }
    );

    User.updateOne(
        {
            _id: user_id,
        },
        {
            $pull: {
                postsLikes: product_id,
            },
            //! pull 메서드는 배열속 데이터 제거
        },
        (err, user) => {
            if (err)
                return res
                    .status(400)
                    .json({ updatePostLikeSuccess: false, err });

            return res.status(200).send({
                updateLikePostSuccess: true,
            });
        }
    );
});

//! UPDATE VIEWS ------------------------------------------------------------------------------------------

router.patch("/products/update/views", (req, res) => {
    const { product_id } = req.body;

    Product.findOneAndUpdate(
        {
            _id: product_id,
        },
        {
            $inc: {
                views: 1,
            },
        },
        { returnNewDocument: true },
        (err, product) => {
            if (err)
                return res.status(400).json({ updateViewsSuccess: false, err });

            return res.status(200).send({
                updateViewsSuccess: true,
                views: product.views,
            });
        }
    );
});

//! post total products -----------------------------------------------------------------

router.delete("/products/delete", (req, res) => {
    const { product_id } = req.body.dataToSend;
    console.log(req.body.dataToSend);
    Product.deleteOne(
        {
            _id: product_id,
        },
        (err, product) => {
            if (err)
                return res
                    .status(400)
                    .json({ deleteProductSuccess: false, err });

            return res.status(200).send({
                deleteProductSuccess: true,
            });
        }
    );
});

//----------------------------------------------------------------------------------

module.exports = router;
