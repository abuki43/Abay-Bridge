// const { body } = require("express-validator");
// const loginValidator = [
//   body("email", "Invalid does not Empty").not().isEmpty(),
//   body("email", "Invalid email").isEmail(),
//   body("password", "The minimum password length is 6 characters").isLength({
//     min: 6,
//   }),
// ];

// const signupValidator = [
//   body("name", "username does not Empty").not().isEmpty(),
//   body("email", "Invalid email").isEmail(),
//   body("password", "The minimum password length is 6 characters").isLength({
//     min: 6,
//   }),
// ];
const Joi = require("joi");

const signupValidator = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(user);
};

const loginValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(user);
};

module.exports = { signupValidator, loginValidator };
