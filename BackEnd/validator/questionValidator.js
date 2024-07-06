const Joi = require("joi");

const questionValidator = (question) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).max(1000),
    level: Joi.string()
      .valid(
        "Primary School",
        "Secondary School",
        "University/College",
        "Other"
      )
      .required(),
    image: Joi.any(),
    subject: Joi.string().min(3).max(1000).required(),
  });
  return schema.validate(question);
};

const answerValidator = (answer) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(3000).required(),
  });
  return schema.validate(answer);
};

module.exports = { questionValidator, answerValidator };
