const express = require("express");
const Question = require("../models/Question");
const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  content: Joi.string().required().min(3).max(255),
  img: Joi.string().allow("").max(1024),
  score: Joi.number(),
  userId: Joi.string(),
});

const router = express.Router();

router.post("/add", (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }

  const post = new Question({ ...req.body, userId: req.userId });

  post
    .save()
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

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Question.findByIdAndDelete(id)
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

router.get("/get", (req, res) => {
  Question.find({})
    .then((question) => {
      res.status(200).json({
        success: true,
        data: question,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});

router.get("/get/:questionId", (req, res) => {
  const { questionId } = req.params;

  Question
    .find({_id:questionId})
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
  const { id } = req.params;
  const {data}=req.body;

  Question.findByIdAndUpdate(id,...data)
    .then((question) => {
      res.status(200).json({
        success: true,
        data: question,
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
