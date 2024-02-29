require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const questionRoutes = require("./routes/question-routes");
const httpError = require("./models/http-error");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.use((req, res, next) => {
  const error = new httpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured." });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
