const express = require("express");
const router = express.Router();

const {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  saveQuestion,
} = require("../controllers/question-controller");

// const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth);
router.get("/save/:QID/:UID", saveQuestion);

router.get("/:page", getQuestions);

router.post("/:UID", newQuestion);

router.patch("/:QID", editQuestion);

router.delete("/:QID", deleteQuestion);

module.exports = router;
