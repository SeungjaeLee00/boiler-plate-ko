const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// bcrypt로 비밀번호 암호화 메서드
userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// plainPassword, hashedPassword 비교 메서드
userSchema.methods.comparePassword = function (plainPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// JWT 토큰 생성 메서드
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id.toHexString() }, "secretToken");

  user.token = token;
  return user.save().then(() => token);
};

// JWT 토큰 검증 및 사용자 찾기 메서드
userSchema.statics.findByToken = function (token) {
  const user = this;

  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretToken", (err, decoded) => {
      if (err) {
        reject(err);
      }

      User.findOne({ _id: decoded.userId, token: token })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };