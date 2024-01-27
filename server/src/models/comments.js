const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: false,
      },
  },
  { timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);
module.exports = Comment;