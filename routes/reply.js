const express = require("express");
const Reply = require("../models/Reply");
const Joi = require("joi");

const replySchema = Joi.object({
  content: Joi.string().required().min(3).max(255),
  score: Joi.number(),
  parentId: Joi.string(),
  userId: Joi.string(),
});

const router = express.Router();

router.post("/add", (req, res) => {
  const { error } = replySchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const reply = new Reply({ ...req.body, userId: req.userId });

  reply
    .save()
    .then((reply_result) => {
      res.status(200).json({
        success: true,
        data: reply_result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error,
      });
    });
});

router.get("/get/:parent_id", (req, res) => {
  const { parent_id } = req.params;

  Reply.find({ parentId: parent_id })
    .then((reply) => {
      res.status(200).json({
        success: true,
        data: reply,
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
  
    Reply.findByIdAndDelete(id)
      .then((reply) => {
        res.status(200).json({
          success: true,
          data: reply,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: error,
        });
      });
  });

module.exports = router;
