const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

router.get("/", async (req, res) => {
  try {
    const request = await Request.find();
    res.status(200).json({
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    res.status(200).json({
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    const newrequest = await request.save();
    res.status(200).json({
      data: newrequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUser = await Request.findOne({ email: req.body.email });
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
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }
    request.to = req.body.to || request.to;
    request.from = req.body.from || request.from;
    request.status = req.body.status || request.status;
    request.mode = req.body.mode || request.mode;
    request.ambience = req.body.ambience || request.ambience;
    request.course = req.body.course || request.course;
    const updatedRequest = await request.save();

    res.status(200).json({
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Request.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Request is deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating data" });
  }
});

module.exports = router;
