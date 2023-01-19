const express = require("express");
const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");
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

  const teamMember = new TeamMember({
    teamId: team._id,
    userId: req.userId,
    status: "2",
  });
  teamMember.save().catch((err) => console.log(err));
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Team.findByIdAndDelete(id)
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

router.get("/get", (req, res) => {
  Team.find({})
    .then((team) => {
      res.status(200).json({
        success: true,
        data: team,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});

router.get("/member/get/:team_id", (req, res) => {
  const { team_id } = req.params;

  TeamMember.find({ teamId: team_id })
    .then((team) => {
      res.status(200).json({
        success: true,
        data: team,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});
/*
router.get("/member/get/:user_id", (req, res) => {
  const { user_id } = req.params;
  const { team_id } = req.body;

  TeamMember.find({ teamId: team_id ,userId:user_id})
    .then((team) => {
      res.status(200).json({
        success: true,
        data: team,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: err,
      });
    });
});*/

router.post("/member/request", (req, res) => {
  const { team_id } = req.body;
  const teamMember = new TeamMember({
    teamId: team_id,
    userId: req.userId,
    status: "0",
  });
  teamMember
    .save()
    .then((member) => {
      res.status(200).json({
        success: true,
        data: member,
      });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        data: err,
      });
    });
});

router.put("/member/join", (req, res) => {
  const { team_id, user_id } = req.body;
  const updateMember = {
    status: "1",
  };
  TeamMember.findOneAndUpdate(
    { userId: user_id, teamId: team_id },
    updateMember
  )
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        data: err,
      });
    });
});

router.put("/member/remove", (req, res) => {
  const { user_id, team_id } = req.body;
  TeamMember.findOneAndDelete({ userId: user_id, teamId: team_id })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        data: err,
      });
    });
});

module.exports = router;
