const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");

const HttpError = require("../models/http-error");

const upvote = async (req, res, next) => {
  const { AID, UID } = req.params;

  let user, answer;
  try {
    user = await User.findById(UID);
    answer = await Answer.findById(AID);

    if (!(answer && user)) {
      const error = new HttpError("voting failed user||answer not found", 400);
      return next(error);
    }
  } catch {
    const error = new HttpError("Failed votng please try again", 500);
    return next(error);
  }

  if (answer.upVote.includes(UID)) {
    answer.upVote.pull(UID);
  } else {
    answer.upVote.push(UID);

    // Remove user from downVote if they are switching their vote
    if (answer.downVote.includes(UID)) {
      answer.downVote.pull(UID);
    }
  }
  await answer.save();
  res.json("user upvoted for an answer");
};

const downvote = async (req, res, next) => {
  const { AID, UID } = req.params;

  let user, answer;
  try {
    user = await User.findById(UID);
    answer = await Answer.findById(AID);

    if (!(answer && user)) {
      const error = new HttpError("voting failed user||answer not found", 400);
      return next(error);
    }
  } catch {
    const error = new HttpError("Failed votng please try again", 500);
    return next(error);
  }

  if (answer.downVote.includes(UID)) {
    answer.downVote.pull(UID);
  } else {
    answer.downVote.push(UID);

    // Remove user from upVote if they are switching their vote
    if (answer.upVote.includes(UID)) {
      answer.upVote.pull(UID);
    }
  }
  await answer.save();
  res.json("user downvoted for an answer");
};

module.exports = { upvote, downvote };
