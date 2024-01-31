const commentRouter = require("express").Router();

// create comment for the post
commentRouter.post("/post-comment", handleCommentPost);

// get all comments for the post
commentRouter.get("/get-comment", handleGetComment);

// update the comment for that post
commentRouter.put("update-comment", handleUpdateComment);

// delete the comment for the post
commentRouter.delete("delete-comment", handleDeleteComment);
