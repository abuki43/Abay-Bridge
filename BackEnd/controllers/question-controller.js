const crypto = require("crypto");

const HttpError = require("../models/http-error");
const { questionValidator } = require("../validator/questionValidator");

const questions = [];

const newQuestion = (req, res, next) => {
  const { title, description } = req.body;

  const { error } = questionValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }

  const newQuestion = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    answers: [],
    date_posted: Date.now(),
  };

  questions.push(newQuestion);
  res.json("new question posted");
};

const editQuestion = (req, res, next) => {};

const deleteQuestion = (req, res, next) => {};

module.exports = { newQuestion, editQuestion, deleteQuestion };
