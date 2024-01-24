const express = require("express");
const app = express();
require("dotenv").config(); // Make sure dotenv is loaded at the beginning
const PORT = process.env.PORT;
const mongoose = require('mongoose');
app.use(express.json());

const { authRouter } = require("./src/routes/index");

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log("Server up and running at port", PORT);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.use("/user/auth", authRouter);
