const express = require("express");
const app = express();

//mongoose 연결
const mongoose = require("mongoose");

// cookie-parser 설정
const cookieParser = require("cookie-parser");

//! cors issue handle
const cors = require("cors");
//-----------------------------------------------------

const config = require("./config/key");

//! STATIC_FILE ---------------------------------------------------------------------------------------------

// 파일 경로를 api를 통해 전달 -> 파일 접근.
app.use("/uploads", express.static("uploads"));

//-----------------------------------------------------
//application/x-www-form-urlencoded 형태 데이터 가져옴
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//-----------------------------------------------------
app.use(cookieParser());
app.use(cors());
//!CONNECT_MONGO_DB ----------------------------------------------------------------------------------------

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
        //mongoose 연결
    })
    .then(() => console.log("Mongo DB Connected...😊"))
    .catch((err) => console.err(err));

//! API ROUTES --------------------------------------------------------------------------------------------------

app.use("/api/product", require("./routes/product"));
app.use("/api/users", require("./routes/user"));

//! SERVER OPEN ----------------------------------------------------------------------------------------------

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Successfully open the server😊.");
});

app.listen(PORT, () => {
    console.log(`SERVER is opening at http://localhost:${PORT}`);
});

//!--------------------------------------------------------------------------------------------------
