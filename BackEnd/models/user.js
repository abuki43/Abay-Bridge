const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  level: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  profile_image: { type: String, required: false },
  questions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  savedQuestions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
  score: { type: Number },
  dateJoined: { type: Date },
  verificationStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
