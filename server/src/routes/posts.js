
const {handleBlogPost, handleBlogUpdate, handleBlogDelete} = require("../controllers/posts");
const isVerified = require("../middlewares/isVerified");

const postRouter = require("express").Router();

postRouter.post("/post-blog", isVerified, handleBlogPost);
postRouter.put("/update-blog", isVerified, handleBlogUpdate);
postRouter.delete("/delete-blog", isVerified, handleBlogDelete);


module.exports = postRouter;


