const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    files: {
        type: Array,
        default: [],
    },
    playTime: {
        type: Number,
        default: 15,
    },
    thumbnail: {
        type: Array,
        defaul: [],
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
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
