const express = require("express");
const router = express.Router();

const { login, signup } = require("../controller/userService");
const { auth, isStudent, isAdmin } = require("../middleware/Auth");

router.post("/login", login);
router.post("/signup", signup);

// protected route
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    succsess: true,
    message: "Protected Route",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    succsess: true,
    message: "Protected Route",
  });
});

module.exports = router;
