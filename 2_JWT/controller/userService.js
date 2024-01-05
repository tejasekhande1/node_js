const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in register user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      // generate jwt token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error in login user",
    });
  }
};
