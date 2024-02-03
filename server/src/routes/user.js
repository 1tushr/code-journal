const express = require("express");
const userRouter = express.Router();

const {handleUpdate, handleDelete, handlePosts,} = require("../controllers/user");

userRouter

  .put("/password", handleUpdate) // update user password
  .delete("/userdata", handleDelete) // delete user completey
  .get("/posts", handlePosts); //get all posts of user along with comments

module.exports = userRouter;
