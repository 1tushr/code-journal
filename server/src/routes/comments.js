const {
  getCommentById,
  postComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const isVerified = require("../middlewares/isVerified");
const commentRouter = require("express").Router();

commentRouter
  .post("/post-comment", isVerified, postComment) // create comment for the post
  .get("/get-comment", isVerified, getCommentById) // get all comments for the post
  .put("/update-comment", isVerified, updateComment) // update the comment for that post
  .delete("/delete-comment", isVerified, deleteComment); // delete the comment for the post

module.exports = commentRouter;
