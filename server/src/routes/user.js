const express = require("express");
const userRouter = express.Router();

const  {handleUpdate, handleDelete,handlePosts}  = require("../controllers/user");

//UPDATE
userRouter.put("/password", handleUpdate );

//DELETE
userRouter.delete("/userdata",handleDelete);

//GET USER

userRouter.get("/posts", handlePosts);

module.exports = userRouter;
