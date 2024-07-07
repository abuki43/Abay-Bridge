const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/email");
const {
  loginValidator,
  signupValidator,
  updateProfileValidator,
} = require("../validator/userValidator");

const signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    level,
    confirmPassword,
    mobileNumber,
  } = req.body;

  if (password != confirmPassword) {
    return next(new HttpError("Password mismatch."));
  }

  const { error } = signupValidator(req.body);
  if (error) {
    console.log(error.details[0].message);
    return next(new HttpError(error.details[0].message, 422));
  }

  try {
    const existingUser = await User.findOne({ email: email });
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
      const error = new HttpError(
        "Could not create user, please try again",
        500
      );
      return next(error);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      level,
      mobileNumber,
      questions: [],
      verificationStatus: false,
      dateJoined: Date.now(),
    });

    try {
      await newUser.save();
    } catch (err) {
      const error = new HttpError(
        "Could not create user, please try again!" + err,
        500
      );
      return next(error);
    }

    const newToken = new Token({
      userId: newUser.id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    try {
      await newToken.save();
    } catch (err) {
      const error = new HttpError(
        "Could not generate token, please try again",
        500
      );
      return next(error);
    }

    const message = `${process.env.BASE_URL}/api/users/verify/${newUser.id}/${newToken.token}`;
    try {
      await sendEmail(newUser.email, "Verify Email", message);
    } catch (err) {
      const error = new HttpError("Could not send verification email", 500);
      return next(error);
    }

    res.json({
      id: newUser.id,
      message: "An email has been sent to your account. Please verify.",
    });
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }
};

const verifingUser = async (req, res, next) => {
  const userId = req.params.id;
  const tokenValue = req.params.token;

  // Find the user by ID in the DB
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Error finding user.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Invalid link.", 400);
    return next(error);
  }

  // Find the token in the DB
  let token;
  try {
    token = await Token.findOne({ userId: user.id, token: tokenValue });
  } catch (err) {
    const error = new HttpError("Error finding token.", 500);
    return next(error);
  }

  if (!token) {
    const error = new HttpError("Invalid link.", 400);
    return next(error);
  }

  // Update the user's verification status
  try {
    user.verificationStatus = true;
    await user.save();
  } catch (err) {
    const error = new HttpError("Error updating user, verfication failed", 500);
    return next(error);
  }

  // Delete the token from the database
  try {
    await Token.findOneAndDelete({ _id: token._id });
  } catch (err) {
    console.log(err);
  }

  res.json({ user: user.toObject(), message: "Email verified successfully" });
};

const login = async (req, res, next) => {
  console.log(req.body);
  const { error } = loginValidator(req.body);
  if (error) {
    return next(new HttpError(error.details[0].message, 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });
  } catch (err) {
    const error = new HttpError("Login failed, please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Could not identify user!", 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Login failed, please try again!", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "6h" }
    );
    console.log(token);
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    userId: existingUser.id,
    email: existingUser.email,
    isVerified: existingUser.verificationStatus,
    token: token,
    profile: {
      pp: existingUser.profile_image,
      firstName: existingUser.firstName,
    },
  });
};
const myProfile = async (req, res, next) => {
  const { UID } = req.params;
  console.log(UID);
  let user;
  try {
    // user = await User.findById(req.userData.userId).select("-password");
    user = await User.findById(UID)
      .select("-password")
      .populate({
        path: "questions",
        populate: {
          path: "author",
          select: "firstName profile_image",
        },
      })
      .populate({
        path: "savedQuestions",
        populate: {
          path: "author",
          select: "firstName profile_image",
        },
      });
  } catch (err) {
    const error = new HttpError("Error finding user.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("user not found", 400);
    return next(error);
  }

  res.status(200).json({ user: user.toObject() });
};

const myQuestions = async (req, res, next) => {
  const { UID } = req.params;

  let user;
  try {
    user = await User.findById(UID).populate("questions").sort({ date: -1 });
    res.json(user.questions);
  } catch {
    const error = new HttpError(
      "finding your questions failed, please try again",
      500
    );
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const userId = req.params.UID;

  const { firstName, lastName, email, level, mobileNumber } = req.body;
  console.log(req.body);
  const { error } = updateProfileValidator(req.body);
  if (error) {
    console.log(error.details[0].message);
    return next(new HttpError(error.details[0].message, 422));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new HttpError("User not found.", 404);
      return next(error);
    }

    // Update the user's profile fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.level = level;
    user.mobileNumber = mobileNumber;
    user.profile_image = req.file?.path || "";

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        "Could not update user profile, please try again!",
        500
      );
      return next(error);
    }

    res.json({
      message: "User profile updated successfully.",
    });
  } catch (err) {
    const error = new HttpError(
      "Could not update user profile, please try again",
      500
    );
    return next(error);
  }
};

module.exports = {
  signup,
  login,
  verifingUser,
  myProfile,
  myQuestions,
  updateProfile,
};
