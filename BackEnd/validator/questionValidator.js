const Joi = require("joi");

const questionValidator = (question) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(1000),
  });
  return schema.validate(question);
};

const answerValidator = (answer) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(1000).required(),
  });
  return schema.validate(answer);
};

module.exports = { questionValidator, answerValidator };
