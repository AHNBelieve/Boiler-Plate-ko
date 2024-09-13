const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("mongoDB Connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello World!asdsa");
});

app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보를 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어줌

  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
