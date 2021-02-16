const express = require("express");
const router = express.Router();
//-----------------------------------------------------------------
const multer = require("multer");
const { Product } = require("../models/Product");
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

//! modify products LIKE -----------------------------------------------------------------

router.patch("/products/like", (req, res) => {
    const { _id, like } = req.body;

    Product.updateOne(
        {
            _id,
        },
        {
            $set: {
                likes: like,
            },
        },
        {
            new: true,
        },

        (err, user) => {
            if (err) return res.json({ updateLikeSuccess: false, err });

            return res.status(200).send({
                updateLikeSuccess: true,
            });
        }
    );
});

//----------------------------------------------------------------------------------

module.exports = router;
