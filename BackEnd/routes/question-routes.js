const express = require("express");
const router = express.Router();

const fileUpload = require("../middleware/file-upload");
const {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  saveQuestion,
  singleQuestion,
} = require("../controllers/question-controller");

// const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth);
router.get("/save/:QID/:UID", saveQuestion);

router.post("/:UID", fileUpload.single("image"), newQuestion);

router.get("/single/:QID", singleQuestion);
router.get("/:page", getQuestions);

router.patch("/:QID", editQuestion);

router.delete("/:QID", deleteQuestion);

module.exports = router;
