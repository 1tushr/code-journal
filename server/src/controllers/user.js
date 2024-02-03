const Comment = require("../models/comments");
const Post = require("../models/posts");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function handleUpdate(req, res) {
  try {
    if (!req.body.id || !req.body.password) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required parameters" });
    }

    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { $set: { password: req.body.password } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDelete(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ error: "Bad request: Missing email or password" });
    }

    const userFound = await User.findOne({ email: req.body.email });

    if (
      !userFound ||
      !(await bcrypt.compare(req.body.password, userFound.password))
    ) {
      return res.status(400).json({ error: "Email or password doesn't match" });
    }
    await Comment.deleteMany({ user: userFound._id });
    await Post.deleteMany({ user: userFound._id });
    const deletedUser = await User.findOneAndDelete({ email: req.body.email });

    res.json({
      message: "User along with comments and posts successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handlePosts(req, res) {
  try {
    const posts = await Post.find().populate("Comment")
    res.json({ posts });
  } catch (error) {
    console.error("error in retrieving posts:", error);
    res.status(500).json({ error: "Internal server error " });
  }
}

module.exports = { handleUpdate, handleDelete, handlePosts };
