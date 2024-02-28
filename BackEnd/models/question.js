const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date_posted: { type: Date, default: Date.now() },
  author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

exports.module = mongoose.model("Question", questionSchema);
