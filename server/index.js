require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const skillRouter = require("./routes/skill");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-leranit.hxghcaw.mongodb.net/?retryWrites=true&w=majority`,
      {}
    );

    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/skills", skillRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
