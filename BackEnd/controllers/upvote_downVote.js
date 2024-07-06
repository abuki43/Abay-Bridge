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
  let message;
  if (answer.upVote.includes(UID)) {
    answer.upVote.pull(UID);
    message = "user removed upvote";
  } else {
    answer.upVote.push(UID);
    message = "user upvoted";
    // Remove user from downVote if they are switching their vote
    if (answer.downVote.includes(UID)) {
      answer.downVote.pull(UID);
    }
  }
  await answer.save();
  res.json({ message });
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
  let message;

  if (answer.downVote.includes(UID)) {
    answer.downVote.pull(UID);
    message = "user removed downvote";
  } else {
    answer.downVote.push(UID);
    message = "user downvoted";
    // Remove user from upVote if they are switching their vote
    if (answer.upVote.includes(UID)) {
      answer.upVote.pull(UID);
    }
  }
  await answer.save();
  res.json({ message });
};

module.exports = { upvote, downvote };
