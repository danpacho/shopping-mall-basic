const express = require("express");
const app = express();
//mongoose 연결
const mongoose = require("mongoose");
//body-parser 연결
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//-----------------------------------------------------
const config = require("./config/key");
//-----------------------------------------------------

//application/x-www-form-urlencoded 형태 데이터 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-----------------------------------------------------
app.use(cookieParser());
app.use(cors());

//!CONNECT_MONGO_DB--------------------------------------------------------------------------------------------------

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
        //mongoose 연결
    })
    .then(() => console.log("Mongo_DB Connected..."))
    .catch((err) => console.log(err));

//!ROUTES--------------------------------------------------------------------------------------------------

app.use("/api/product", require("./routes/product"));
app.use("/api/users", require("./routes/user"));

//!STATIC_FILE--------------------------------------------------------------------------------------------------

app.use("/uploads", express.static("uploads"));

//!--------------------------------------------------------------------------------------------------

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Open Server!");
});

app.listen(PORT, () => {
    console.log(`NODE_SERVER is listening at http://localhost:${PORT}`);
});

//!--------------------------------------------------------------------------------------------------
