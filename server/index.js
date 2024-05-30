const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/user-data", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected successfully");
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while creating the user.");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secret123"
      );
      res.send({ status: "ok", user: token });
    } else {
      res
        .status(401)
        .send({ status: "error", user: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while logging in.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectDB();
});
