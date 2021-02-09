const express = require("express");
const router = express.Router();
//-----------------------------------------------------------------
const multer = require("multer");
//-----------------------------------------------------------------
const UPLOAD_DIR = "uploads/user_uploads";
const UPLOAD_THUMBNAIL_DIR = "uploads/user_uploads_thumbnail";
//-----------------------------------------------------------------
const FILE_UPLOAD_URL = "/data/file";
const THUMBNAIL_UPLOAD_URL = "/data/thumbnail";
//-----------------------------------------------------------------

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

//-----------------------------------------------------------------

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

//-----------------------------------------------------------------

module.exports = router;
