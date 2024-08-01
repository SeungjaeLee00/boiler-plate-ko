const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); 
const config = require("./config/key");

const { User } = require("./models/User");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("안녕하세요. jaejae입니다.");
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다.",
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
    const token = await user.generateToken();
    res
      .cookie("user_auth", token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
