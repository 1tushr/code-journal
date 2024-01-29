//CREATE POST
//CHECK IF LOGGEDIN
/*req.body{
title:"this is crud app",
desc: "crud is a good way to learn the basic of rest",
image: "http//www.dshbs.com/ssdjfndkdhfbjsf",
author : "sdgfv",
username :"skfdkj",
author:{id: "1212362gdsu34g"},

} */

const {handleBlogPost,handleBlogUpdate} = require("../controllers/posts");
const isVerified = require("../middlewares/isVerified");

const postRouter = require("express").Router();

postRouter.post("/post-blog", isVerified, handleBlogPost);
postRouter.put("/update-blog", isVerified, handleBlogUpdate);

module.exports = postRouter;

//READ POST
//CHECK IF LOGGEDIN

//UPDATE POST
//CHECK IF LOGGEDIN

//DELETE POST
//CHECK IF LOGGEDIN
