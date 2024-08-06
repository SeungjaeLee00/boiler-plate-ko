const { User } = require("../models/User");

const auth = async (req, res, next) => {
  try {
    // Cookie에서 Token 가져옴
    const token = req.cookies.user_auth;

    if (!token) {
      return res.json({ isAuth: false, error: true });
    }

    // Token 검증하고 User 찾기
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
};

module.exports = { auth };