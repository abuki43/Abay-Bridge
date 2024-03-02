const express = require("express");
const router = express.Router();

const { postAnswer, getAnswers } = require("../controllers/answer-controller");
const { upvote, downvote } = require("../controllers/upvote_downVote");
const checkAuth = require("../middleware/check-auth");

//router.use(checkAuth);

router.post("/:UID/:QID", postAnswer);
router.post("/upvote/:AID/:UID", upvote);

router.post("/downvote/:AID/:UID", downvote);
router.get("/:QID", getAnswers);

module.exports = router;
