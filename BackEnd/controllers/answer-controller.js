const mongoose = require("mongoose");

const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");

const HttpError = require("../models/http-error");
const { answerValidator } = require("../validator/questionValidator");

const postAnswer = async (req, res, next) => {
  const { error } = answerValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }
  const { QID, UID } = req.params;
  const { content } = req.body;

  let user;
  try {
    user = await User.findById(UID);
  } catch (err) {
    const error = new HttpError("Error finding user .", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided ID,answering question failed.",
      404
    );
    return next(error);
  }

  let question;
  try {
    question = await Question.findById(QID).populate(
      "author",
      "firstName profile_image"
    );
  } catch (err) {
    const error = new HttpError("Error finding question ", 500);
    return next(error);
  }

  if (!question) {
    const error = new HttpError("Could not find a question.", 404);
    return next(error);
  }

  const newAnswer = new Answer({
    content: content,
    author: user._id,
    question: question._id,
  });

  try {
    await newAnswer.save();
    question.answers.push(newAnswer);
    await question.save();
  } catch {
    const error = new HttpError("Failed answering a question", 500);
    return next(error);
  }

  res.json("new answer posted.");
};

const getAnswers = async (req, res, next) => {
  const { QID } = req.params;

  try {
    const question = await Question.findById(QID).populate("answers");

    if (!question) {
      const error = new HttpError("Could not find a question.", 404);
      return next(error);
    }

    const answers = question.answers;

    res.status(200).json({ answers });
  } catch (err) {
    const error = new HttpError(
      "Failed finding answers , please try again.",
      500
    );
    return next(error);
  }
};

module.exports = { postAnswer, getAnswers };
