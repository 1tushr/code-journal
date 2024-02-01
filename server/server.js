const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cookieParser());
const { authRouter, userRouter, postRouter } = require("./src/routes/index");
const commentRouter = require("./src/routes/comments");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log("Server up and running at port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.use("/user/auth", authRouter);
app.use("/user/update", userRouter);
app.use("/user/delete", userRouter);
app.use("/new/post", postRouter);
app.use("/delete/post", postRouter);
app.use("/comments/",commentRouter)
