const express = require("express");
const router = express.Router();

const {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
} = require("../controllers/question-controller");

// const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth);
router.get("/:page", getQuestions);

router.post("/:UID", newQuestion);

router.patch("/:QID", editQuestion);

router.delete("/:QID", deleteQuestion);

module.exports = router;
