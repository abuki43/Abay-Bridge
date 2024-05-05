const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date_posted: { type: Date, default: Date.now },
  level: { type: String },
  subject: { type: String },
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
  isEdited: { type: Boolean, default: false },
});

module.exports = mongoose.model("Question", questionSchema);
