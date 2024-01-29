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

async function handleBlogUpdate(req, res) {
  try {
    const { title, desc, photo } = req.body;
    const blogId = req.query._id;
    console.log ("blogid", blogId);
    const existingBlog = await Post.findOne({ _id: blogId });

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog Post not found" });
    }

    if (existingBlog.authorId != req.locals.user.id) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // checking if the params have the required fields and if not keep the defualt values  

    if (title !== undefined) {
      existingBlog.title = title;
    }
    if (desc !== undefined) {
      existingBlog.desc = desc;
    }
    if (photo !== undefined) {
      existingBlog.photo = photo;
    }

    const updatedBlog = await Post.findByIdAndUpdate(
      blogId,
      { $set: existingBlog },
      { new: true }
    );

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Failed to update the blog ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { handleBlogPost, handleBlogUpdate };
