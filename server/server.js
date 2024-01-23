const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require ('mongoose');
app.use(express.json());

const { authRouter } = require("./src/routes/index");

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
  console.log('connected to mongodb');
  try {
    app.listen(PORT, () => {
      console.log("server up and running at port", PORT);
    });
  } catch (error) {
    console.log("error occured", error);
    process.exit(1);
  }
});



app.use("/user/auth", authRouter);
