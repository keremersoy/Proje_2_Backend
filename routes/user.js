const express = require("express");
const User = require("../models/User.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/get/:user_id", (req, res) => {
  const { user_id } = req.params;

  User
    .find({_id:user_id})
    .then((user) => {
        res.status(200).json({
            success: true,
            data: user,
          });
     })
     .catch((err) => {
        res.status(400).json({
          success: false,
          message: err,
        });
    });
});


module.exports = router;
