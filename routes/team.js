const express = require("express");
const Team = require("../models/Team");
const Joi = require("joi");

const teamSchema = Joi.object({
  ownerId: Joi.string(),
  title: Joi.string().required().min(3).max(30),
  content: Joi.string().required().min(3).max(255),
});

const router = express.Router();


router.post("/add", (req, res) => {
    const { error } = teamSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
    const team = new Team({ ...req.body, ownerId: req.userId });
  
    team
      .save()
      .then((team) => {
        res.status(200).json({
          success: true,
          data: team,
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
  
    Team.findByIdAndDelete(id)
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
  Team.find({})
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
