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
    console.log(req.body, error.details[0].message);
    return next(new HttpError(error.details[0].message, 422));
  }

  const { title, description, level, subject } = req.body;
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
    level,
    subject,
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

  const { title, description, level, subject } = req.body;

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

  question.title = title;
  question.description = description;
  question.isEdited = true;
  question.level = level;
  question.subject = subject;

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

const getQuestions = async (req, res, next) => {
  const page = parseInt(req.params.page);
  console.log(page);
  const perPage = 10;

  try {
    let query = {}; // Initialize an empty query object

    const levels = req.query.levels ? req.query.levels.split(",") : [];
    const subjects = req.query.subjects ? req.query.subjects.split(",") : [];
    console.log(levels, subjects);
    // Check if filter options are provided and not equal to "ALL"
    if (levels.length > 0 && !levels.includes("ALL")) {
      query.level = { $in: levels }; // Add level filter to the query
    }

    if (subjects.length > 0 && !subjects.includes("ALL")) {
      query.subject = { $in: subjects }; // Add subject filter to the query
    }

    const totalQuestions = await Question.countDocuments(query); // Get the total number of filtered questions in the database
    const startIndex = (page - 1) * perPage;

    // Fetch paginated filtered questions from the database using skip and limit
    const paginatedQuestions = await Question.find(query)
      .populate({
        path: "author",
        select: "firstName profilePicture score",
      })
      .populate({
        path: "answers",
        populate: {
          path: "author",
          select: "firstName profilePicture score",
        },
      })
      .skip(startIndex)
      .limit(perPage);

    res.json({
      questions: paginatedQuestions,
      totalPages: Math.ceil(totalQuestions / perPage), // Calculate the total number of pages
    });
  } catch (e) {
    console.log(e);
    const error = new HttpError("Getting questions failed", 500);
    return next(error);
  }
};

const saveQuestion = async (req, res, next) => {
  const QID = req.params.QID;
  const UID = req.params.UID;

  let user;
  try {
    user = await User.findById(UID).populate("savedQuestions");
  } catch (err) {
    const error = new HttpError(
      "Error finding user before saving question.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided ID.",
      404
    );
    return next(error);
  }

  const savedQuestionsIndex = user.savedQuestions.findIndex(
    (question) => question.id === QID
  );

  if (savedQuestionsIndex !== -1) {
    // Question already saved, remove it from the saved list
    user.savedQuestions.splice(savedQuestionsIndex, 1);
    await user.save();
    res.status(200).json({ message: "Question removed from saved list" });
  } else {
    // Question not saved, add it to the saved list
    user.savedQuestions.push(QID);
    await user.save();
    res.status(200).json({ message: "Question saved successfully" });
  }
};

module.exports = {
  newQuestion,
  editQuestion,
  deleteQuestion,
  getQuestions,
  saveQuestion,
};
