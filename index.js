const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth.js");
const questionRouter = require("./routes/question.js");
const teamRouter = require("./routes/team.js");
const verifyToken = require("./middleware/verifyToken.js");

require("dotenv/config");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_DATABASE_NAME + "/test",
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log("Connected to database");
    }
  }
);

app.use("/auth", authRouter);
app.use("/question",verifyToken, questionRouter);
app.use("/team",verifyToken, teamRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

