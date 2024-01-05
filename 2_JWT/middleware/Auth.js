const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // extract jwt token -> Header,Body,Cookie
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token Invalid",
    });
  }
};
