const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const util = require("util");

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
    minLength: 5,
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

userSchema.pre("save", function (next) {
  //비밀번호를 암호화시킨다.
  var user = this;

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

userSchema.methods.comparePassword = function (plainPassword) {
  // 암호화된 비밀번호와 같은지 체크
  const user = this;
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  // jwt 생성
  user = this;
  const token = jwt.sign(user._id.toJSON(), "secretToken");
  user.token = token;

  return user.save();
};

userSchema.statics.findByToken = function (token) {
  const user = this;

  return util
    .promisify(jwt.verify)(token, "secretToken")
    .then((decoded) => {
      console.log(decoded);
      return user.findOne({
        _id: decoded,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error("유효하지 않은 토큰입니다.");
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
