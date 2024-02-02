const { getCommentById, postComment, updateComment, deleteComment} = require("../controllers/comments");

const isVerified = require("../middlewares/isVerified");
const commentRouter = require("express").Router();

// create comment for the post
commentRouter.post("/post-comment", isVerified, postComment);

// get all comments for the post
commentRouter.get("/get-comment", isVerified, getCommentById);

// update the comment for that post
commentRouter.put("/update-comment", isVerified, updateComment);

// // delete the comment for the post
commentRouter.delete("/delete-comment", isVerified, deleteComment);

module.exports = commentRouter;
