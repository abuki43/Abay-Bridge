const crypto = require("crypto");
const mongoose = require("mongoose");

const Question = require("../models/question");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const { questionValidator } = require("../validator/questionValidator");

const questions = [];

const newQuestion = async (req, res, next) => {
  const { error } = questionValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }

  const { title, description } = req.body;
  const userId = req.params.UID;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Error finding user before creating a new question.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided ID,ceating question placed.",
      404
    );
    return next(error);
  }

  const newQuestion = new Question({
    title: title,
    description: description,
    answers: [],
    date_posted: Date.now(),
    author: userId,
  });

  let sess;
  try {
    sess = await mongoose.startSession();
    sess.startTransaction();
    await newQuestion.save({ session: sess });
    user.questions.push(newQuestion);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Failed creating new question", 500);
    return next(error);
  } finally {
    if (sess) {
      sess.endSession();
    }
  }

  res
    .status(201)
    .json({ question: newQuestion, message: "Question posted successfully" });
};

const editQuestion = async (req, res, next) => {
  const QID = req.params.QID;

  const { error } = questionValidator(req.body);
  if (error) {
    console.log(error);
    return next(new HttpError(error.details[0].message, 422));
  }

  const { title, description } = req.body;

  let question;
  try {
    question = await Question.findById(QID);
  } catch {
    const error = new HttpError(
      "finding question for editing failed, try again.",
      500
    );
    return next(error);
  }

  if (!question) {
    const error = new HttpError("could not find question for this id.", 404);
    return next(error);
  }
  // if (question.author.toString() !== req.userData.userId) {
  //   const error = new HttpError("You are not allowed to edit this question.", 401);
  //   return next(error);
  // }

  question.title = title;
  question.description = description;
  question.isEdited = true;

  try {
    await question.save();
  } catch (err) {
    const error = new HttpError("editing question failed, try again", 500);
    return next(error);
  }

  res.status(200).json({ question: question.toObject() });
};
const deleteQuestion = async (req, res, next) => {
  const QID = req.params.QID;
  let question;

  try {
    question = await Question.findById(QID).populate("author");
  } catch {
    const error = new HttpError(
      "finding question for deleteing failed, try again.",
      500
    );
    return next(error);
  }

  if (!question) {
    const error = new HttpError("could not find question for this id.", 404);
    return next(error);
  }

  // if (question.author.toString() !== req.userData.userId) {
  //   const error = new HttpError("You are not allowed to delete this question.", 401);
  //   return next(error);
  // }

  let sess;
  try {
    sess = await mongoose.startSession();
    sess.startTransaction();
    await Question.findOneAndDelete({ _id: QID }, { session: sess });
    question.author.questions.pull(question);
    await question.author.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("deleting question failed, try again.", 500);
    return next(error);
  } finally {
    if (sess) {
      sess.endSession();
    }
  }

  res.status(200).json({ message: "successfully deleted!" });
};

module.exports = { newQuestion, editQuestion, deleteQuestion };
