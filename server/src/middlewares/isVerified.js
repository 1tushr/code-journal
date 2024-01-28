const jwt = require("jsonwebtoken");
require("dotenv").config();

const isVerified = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const isAuth = jwt.verify(token, process.env.SECRET_TOKEN);

    if (isAuth) {
      req.locals = isAuth;
      console.log(req.locals);
      next();
    } else {
      res.status(401).send({
        status: 401,
        message: "User not authenticated, please login.",
      });
    }
  } catch (error) {
    res.status(401).send({
      status: 401,
      message: "Invalid token, please login.",
    });
  }
};

module.exports = isVerified;
