const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: { type: String, required: true },
  date_posted: { type: Date, default: Date.now() },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  question: { type: mongoose.Types.ObjectId, ref: "Question", required: true },
  upVote: { type: Number, default: 0 },
  downVote: { type: Number, default: 0 },
  parentAnswer: { type: mongoose.Types.ObjectId, ref: "Question" },
});

exports.module = mongoose.model("Answer", answerSchema);
