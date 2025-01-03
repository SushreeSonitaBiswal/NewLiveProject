const express = require("express");
const router = express.Router();
const Userlist = require("../models/Userlist");

router.get("/", async (req, res) => {
  try {
    const userlist = await Userlist.find();
    res.status(200).json({
      data: userlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userlist = await Userlist.findById(req.params.id);

    res.status(200).json({
      data: userlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userlist = new Userlist(req.body);
    const newuserlist = await userlist.save();
    res.status(200).json({
      data: newuserlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUser = await Userlist.findOne({ email: req.body.email });
    if (newUser) {
      if (newUser.password === req.body.password) {
        res.status(200).json({
          msg: "Ok",
          data: newUser,
        });
      } else {
        res.status(200).json({
          msg: "Inccorect password",
        });
      }
    } else {
      res.status(200).json({
        msg: "Invalid user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userlist = await Userlist.findById(req.params.id);

    if (!userlist) {
      return res.status(400).json({ message: "Userlist not found" });
    }
    userlist.lastname = req.body.lastname || userlist.lastname;
    userlist.email = req.body.email || userlist.email;
    userlist.password = req.body.password || userlist.password;
    const updatedUserlist = await userlist.save();

    res.status(200).json({
      data: updatedUserlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Userlist.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Userlist is deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

module.exports = router;
