const express = require("express");
const router = express.Router();
const Addcourse = require("../models/Addcourse");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

router.get("/", async (req, res) => {
  try {
    const addcourse = await Addcourse.find();
    res.status(200).json({ data: addcourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Redis-Caching
    const courseId = req.params.id;
    const cachedCourse = await client.get(`course-${courseId}`);
    if (cachedCourse) {
      const course = JSON.parse(cachedCourse);
      return res.status(200).json({ data: course });
    }
    const course = await Addcourse.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Redis-Caching
    await client.set(`course-${courseId}`, JSON.stringify(course));

    // Over
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const addcourse = new Addcourse(req.body);
    const newaddcourse = await addcourse.save();
    res.status(201).json({ data: newaddcourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const newUser = await Addcourse.findOne({ email: req.body.email });
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
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const addcourse = await Addcourse.findById(req.params.id);
    if (!addcourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    addcourse.email = req.body.email || addcourse.email;
    addcourse.password = req.body.password || addcourse.password;

    const updateAddcourse = await addcourse.save();
    res.status(200).json({ data: updateAddcourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Addcourse.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: "Addcourse deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
