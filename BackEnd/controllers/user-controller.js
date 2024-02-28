const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const sendEmail = require("../utils/email");
const {
  loginValidator,
  signupValidator,
} = require("../validator/userValidator");

const users = [];
const tokens = [];

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = signupValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    const error = new HttpError(
      "Could not create user, email already exists.",
      409
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    questions: [],
    verificationStatus: false,
    dateJoined: Date.now(),
  };

  users.push(newUser);
  const Token = {
    userId: newUser.id,
    token: crypto.randomBytes(32).toString("hex"),
  };
  tokens.push(Token);

  const message = `${process.env.BASE_URL}/api/users/verify/${newUser.id}/${Token.token}`;
  await sendEmail(newUser.email, "Verify Email", message);
  res.json("An Email sent to your account please verify");
};

const verifingUser = (req, res) => {
  try {
    const user = users.find((u) => u.id == req.params.id);
    if (!user) {
      const error = new HttpError("Invalid link.", 400);
      return next(error);
    }
    const token = tokens.find(
      (t) => t.userId == user.id && t.token == req.params.token
    );
    if (!token) {
      const error = new HttpError("Invalid link.", 400);
      return next(error);
    }

    const updatedUser = users.find((u) => u.id === user.id);
    if (updatedUser) {
      updatedUser.verificationStatus = true;
    }
    const tokenIndex = tokens.findIndex((t) => t.id === token.id);
    if (tokenIndex !== -1) {
      tokens.splice(tokenIndex, 1);
    }

    res.json("email verified sucessfully");
  } catch (err) {
    const error = new HttpError("verification failed", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { error } = loginValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = users.find((user) => user.email === email);
  } catch (err) {
    const error = new HttpError("login  failed, please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not identify user, credentials seem to be wrong",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in , please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials seem to be wrong, Could not log you in",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);
  } catch (err) {
    const error = new HttpError("Signing up failed, try again.", 500);
    return next(error);
  }
  res.status(201).json({
    userId: existingUser.id,
    email: existingUser.email,
    isVerified: existingUser.verificationStatus,
    token: token,
  });
};

const myProfile = (req, res, next) => {
  let user;

  user = users.find((u) => u.id == req.userData.userId);

  res.status(200).json({ user });
};

module.exports = { signup, login, verifingUser, myProfile };
