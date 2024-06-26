const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const {
  signup,
  login,
  verifingUser,
  myProfile,
  myQuestions,
  updateProfile,
} = require("../controllers/user-controller");

router.post("/signup", signup);

router.get("/verify/:id/:token", verifingUser);

router.post("/login", login);

// router.use(checkAuth);

router.get("/me/:UID", myProfile);

router.get("/myQuestions/:UID", myQuestions);

router.patch("/me/:UID", updateProfile);

module.exports = router;
