const express = require("express");
const router = express.Router();
const Addstudents = require("../models/Addstudents");

router.get("/", async (req, res) => {
  try {
    const addstudents = await Addstudents.find();
    res.status(200).json({ data: addstudents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const addstudents = await Addstudents.findById(req.params.id);
    res.status(200).json({ data: addstudents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const addstudents = new Addstudents(req.body);
    const newaddstudents = await addstudents.save();
    res.status(201).json({ data: newaddstudents });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUser = await Addstudents.findOne({ email: req.body.email });
    if (newUser) {
      if (newUser.password === req.body.password) {
        res.status(200).json({ msg: "Ok", data: newUser });
      } else {
        res.status(200).json({ msg: "Incorrect password" });
      }
    } else {
      res.status(400).json({ msg: "Invalid user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const addstudents = await Addstudents.findById(req.params.id);
    if (!addstudents) {
      return res.status(404).json({ message: "Student not found" });
    }

    addstudents.name = req.body.name || addstudents.name;
    addstudents.email = req.body.email || addstudents.email;
    addstudents.password = req.body.password || addstudents.password;
    addstudents.grade = req.body.grade || addstudents.grade;
    addstudents.areaOfStudy = req.body.areaOfStudy || addstudents.areaOfStudy;
    addstudents.skills = req.body.skills || addstudents.skills;
    addstudents.language = req.body.language || addstudents.language;
    addstudents.qualification =
      req.body.qualification || addstudents.qualification;
    addstudents.specialization =
      req.body.specialization || addstudents.specialization;
    addstudents.teachingExp = req.body.teachingExp || addstudents.teachingExp;
    addstudents.type = req.body.type || addstudents.type;
    addstudents.addData = req.body.addData || addstudents.addData;
    addstudents.timing = req.body.timing || addstudents.timing;
    addstudents.videoLink = req.body.videoLink || addstudents.videoLink;
    addstudents.profilePhoto =
      req.body.profilePhoto || addstudents.profilePhoto;
    const updateAddstudents = await addstudents.save();

    res.status(200).json({ data: updateAddstudents });
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Addstudents.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
});

module.exports = router;
