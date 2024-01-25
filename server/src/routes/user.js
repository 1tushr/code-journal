const express = require("express");
const userRouter = express.Router();

const  handleUpdate  = require("../controllers/user");

//UPDATE
userRouter.put("/password", handleUpdate );

//DELETE

//GET USER

module.exports = userRouter;
