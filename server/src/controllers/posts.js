const Post = require("../models/posts");

async function handleBlogPost(req, res) {
  try {
    const { title, desc, photo, comments } = req.body;

    const newBlog = await Post.create({
      title,
      desc,
      authorId: req.locals.user.id,
      photo,
      username: req.locals.user.username,
      comments,
    });

    console.log("Post created successfully");
    res.json(newBlog);
  } catch (error) {
    console.error("Failed to create blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = handleBlogPost;
