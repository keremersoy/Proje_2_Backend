const express = require("express");
const User = require("../models/User.js");
const Question = require("../models/Question");
const Team = require("../models/Team");

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

router.get("/get/questions/:user_id", (req, res) => {
  const {user_id}=req.params;

  Question
    .find({userId:user_id})
    .then((post) => {
      res.status(200).json({
        success: true,
        data: post,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error,
      });
    });
});

router.get("/get/teams/:user_id", (req, res) => {
  const {user_id}=req.params;

  Team
    .find({ownerId:user_id})
    .then((post) => {
      res.status(200).json({
        success: true,
        data: post,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error,
      });
    });
});

router.put("/update/:id",(req, res)=>{
  const {id}=req.params;
  const {data}=req.body;
  User.findByIdAndUpdate(id,data)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
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
