const Comment = require("../models/comments");
const Post = require("../models/posts");
const mongoose = require("mongoose");

async function getCommentById(req, res) {
  try {
    const commentId = req.query._id;
    console.log("comment id ", commentId);
    const comment = await Comment.findById(commentId).populate("postId ");

    if (!comment) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("Populated Comment Data:", {
      _id: comment._id,
      comment: comment.comment,
      author: comment.author,
      postId: comment.postId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });

    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function postComment(req, res) {
  try {
    const post = await Post.findById(req.query._id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { comment } = req.body;

    const newComment = await Comment.create({
      comment,
      author: req.locals.user.username,
      postId: post._id,
      userId: req.locals.user.id,
    });

    if (newComment) {
      post.comments.push(newComment);
      await post.save();
    }

    console.log("New comment:", newComment);
    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//update and delete should be allowed if the comment belongs to the user

//update comment

async function updateComment(req, res) {
  try {
    const commentId = req.query._id;
    const newComment = req.body.comment;

    // Validate input data
    if (!commentId || !newComment) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found" });
    }

    const userId = new mongoose.Types.ObjectId(req.locals.user.id);

    if (!userId.equals(comment.userId)) {
      console.log("Permission denied");
      return res.status(403).json({ message: "Permission denied" });
    }

    comment.comment = newComment;
    await comment.save();

    console.log("Updated comment:", newComment);
    res
      .status(200)
      .json({ message: "Comment updated successfully", comment: newComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//delete comment
async function deleteComment(req, res) {
  try {
    const postId = req.query._id;

    const comment = await Comment.findById(postId);

    if (!comment) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found" });
    }

    const userId = new mongoose.Types.ObjectId(req.locals.user.id);

    if (!userId.equals(comment.userId)) {
      console.log("Permission denied");
      return res.status(403).json({ message: "Permission denied" });
    }

    await comment.deleteOne();
    console.log("Deleted comment:", comment);
    res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    console.error("Error deleting  comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { getCommentById, postComment, updateComment, deleteComment };
