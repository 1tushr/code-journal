const {
  handleBlogPost,
  handleBlogUpdate,
  handleBlogDelete,
  handleGetPost,
} = require("../controllers/posts");
const isVerified = require("../middlewares/isVerified");

const postRouter = require("express").Router();

postRouter
  .post("/post-blog", isVerified, handleBlogPost) // post new blog
  .put("/update-blog", isVerified, handleBlogUpdate) // update blog
  .delete("/delete-blog", isVerified, handleBlogDelete) // delete blog
  .get("/get-blogs", isVerified, handleGetPost); // get all blogs available

module.exports = postRouter;
