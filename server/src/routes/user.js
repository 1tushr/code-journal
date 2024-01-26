const express = require("express");
const userRouter = express.Router();

const  {handleUpdate, handleDelete}  = require("../controllers/user");

//UPDATE
userRouter.put("/password", handleUpdate );

//DELETE
userRouter.delete("/delete",handleDelete);

//GET USER

module.exports = userRouter;
