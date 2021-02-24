const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//댓글 전용 schema 생성.
const CommentsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    comment_date: { type: Date, default: Date.now },
});

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    tags: {
        type: String,
    },

    playTime: {
        type: Number,
        default: 15,
    },
    filePath: {
        type: String,
    },
    thumbnailPath: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    download: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [CommentsSchema],
    //! CommentsSchema 참조.
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
