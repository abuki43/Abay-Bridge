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
      const error = new HttpError("Voting failed: user or answer not found", 400);
      return next(error);
    }

    let message;
    let answerOwner;
    let hisAnswer = answer.author._id.toString() === UID; // Check if user owns the answer

    if (answer.upVote.includes(UID)) {
      answer.upVote.pull(UID);
      message = "User removed upvote";
      if (!hisAnswer) {
        answerOwner = await User.findById(answer.author._id);
        answerOwner.score -= 2;
        await answerOwner.save();
      }
    } else {
      answer.upVote.push(UID);
      message = "User upvoted";
      if (!hisAnswer) {
        answerOwner = await User.findById(answer.author._id);
        answerOwner.score += 2;
        
        
        // Remove user from downVote if they are switching their vote
        if (answer.downVote.includes(UID)) {
          answer.downVote.pull(UID);
          answerOwner.score += 2;
        }
        await answerOwner.save();
      }
    }

    await answer.save();
    res.json({ message });
  } catch (error) {
    const errorMessage = error.message || "Failed voting, please try again";
    const status = error.status || 500;
    const httpError = new HttpError(errorMessage, status);
    return next(httpError);
  }
};

const downvote = async (req, res, next) => {
  const { AID, UID } = req.params;

  let user, answer;
  try {
    user = await User.findById(UID);
    answer = await Answer.findById(AID);

    if (!(answer && user)) {
      const error = new HttpError("Voting failed: user or answer not found", 400);
      return next(error);
    }

    let message;
    let answerOwner;
    let hisAnswer = answer.author._id.toString() === UID; // Check if user owns the answer

    if (answer.downVote.includes(UID)) {
      answer.downVote.pull(UID);
      message = "User removed downvote";
      if (!hisAnswer) {
        answerOwner = await User.findById(answer.author._id);
        answerOwner.score += 2;
        await answerOwner.save();
      }
    } else {
      answer.downVote.push(UID);
      message = "User downvoted";
      if (!hisAnswer) {
        answerOwner = await User.findById(answer.author._id);
        answerOwner.score -= 2; 
        
        // Remove user from upVote if they are switching their vote
        if (answer.upVote.includes(UID)) {
          answer.upVote.pull(UID);
          answerOwner.score -= 2;
        }
        await answerOwner.save();
      }
    }

    await answer.save();
    res.json({ message });
  } catch (error) {
    const errorMessage = error.message || "Failed voting, please try again";
    const status = error.status || 500;
    const httpError = new HttpError(errorMessage, status);
    return next(httpError);
  }
};

module.exports = { upvote, downvote };
