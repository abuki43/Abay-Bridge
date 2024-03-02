const express = require("express");
const router = express.Router();

const { postAnswer, getAnswers } = require("../controllers/answer-controller");
const { upvote, downvote } = require("../controllers/upvote_downVote");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.post("/:UID/:QID", postAnswer);

router.get("/:QID", getAnswers);

router.post("/upvote/:AID/:UID", upvote);

router.post("/downvote/:AID/:UID", downvote);

module.exports = router;
