const express = require("express");
const User = require("../models/User.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(15),
  password: Joi.string().required().min(6).max(255),
});

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  username: Joi.string().required().min(3).max(15),
  email: Joi.string().required().email().min(6).max(255),
  password: Joi.string().required().min(6).max(255),
});

const router = express.Router();

router.post("/register", (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({ ...req.body, password: hash });

  user
    .save()
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_CODE);

      res.header("Authorization", token).json({ accessToken: token });
    })
    .catch(() => {
      res.json("hata");
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(400).send("Invalid username or password.");
        return;
      }

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        res.status(400).send("Invalid username or password.");
        return;
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_CODE);

      res
        .header("Authorization", token)
        .json({ accessToken: token, userId: user._id });
    })
    .catch(() => {
      res.status(400).send("Invalid username or password.");
      return;
    });
});

module.exports = router;
