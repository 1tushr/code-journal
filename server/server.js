const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const {authRouter} = require('./src/routes/index')



try {
  app.listen(PORT, () => {
    console.log("server up and running at port", PORT);
  });
} catch (error) {
  console.log("error occured", error);
}

app.use("/user/auth", authRouter);
