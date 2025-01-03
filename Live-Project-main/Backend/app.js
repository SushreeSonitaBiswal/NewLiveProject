const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Connection to DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// checking
app.get("/", (req, res) => {
  res.status(200).send({ msg: "It's working" });
});

// routes
app.use("/api/userlist", require("./routes/userlist"));
app.use("/api/addstudents", require("./routes/addstudents"));
app.use("/api/addcourse", require("./routes/addcourse"));
app.use("/api/newsandannu", require("./routes/newsandannu"));
app.use("/api/request", require("./routes/request"));

// port
const port = process.env.PORT || 5001;

// server run
app.listen(port, () => console.log(`Server is running at ${port}`));
