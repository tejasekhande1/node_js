const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // extract jwt token -> Header,Body,Cookie
    // const token = req.body.token;
    // const token = req.cookies.token
    const token = req.header("Authentication").replace("Bearer ","")
    console.log("Header : ",req.header);
    console.log("Token : ",token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const secretKey = process.env.JWT_SECRETs;
      console.log("Secret Key : ", secretKey);
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decode Data : ", decode);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the role",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for admins",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the role",
    });
  }
};
