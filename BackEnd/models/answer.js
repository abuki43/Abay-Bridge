const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: { type: String, required: true },
  date_posted: { type: Date, default: Date.now },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  question: { type: mongoose.Types.ObjectId, ref: "Question", required: true },
  upVote: [{ type: mongoose.Types.ObjectId }],
  downVote: [{ type: mongoose.Types.ObjectId }],
  parentAnswer: { type: mongoose.Types.ObjectId, ref: "Answer" },
});

module.exports = mongoose.model("Answer", answerSchema);
