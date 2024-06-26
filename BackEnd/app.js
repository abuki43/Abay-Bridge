require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");
const questionRoutes = require("./routes/question-routes");
const answerRoutes = require("./routes/answer-routes");
const httpError = require("./models/http-error");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answer", answerRoutes);

app.use((req, res, next) => {
  const error = new httpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured." });
});

mongoose
  .connect(process.env.mongoDBUrl)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("listening on " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
