const Post = require("../models/posts");
const mongoose = require("mongoose");
async function handleBlogPost(req, res) {
  try {
    const { title, desc, photo } = req.body;

    const newBlog = await Post.create({
      title,
      desc,
      authorId: req.locals.user.id,
      photo,
      username: req.locals.user.username,
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
    console.log("blogid", blogId);
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

async function handleBlogDelete(req, res) {
  try {
    // Input validation
    const blogId = req.query._id;
    if (!blogId) {
      return res.status(400).json({ error: "Blog ID not provided" });
    }

    // Fetch the existing blog
    const existingBlog = await Post.findById(blogId);

    // Check if the blog post exists
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog Post not found" });
    }

    // Authorization check
    const userId = new mongoose.Types.ObjectId(req.locals.user.id);
    if (!existingBlog.authorId.equals(userId)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    // Delete the blog post
    const deletedBlog = await Post.findByIdAndDelete(blogId);

    // Check if the blog was found and deleted
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found for deletion" });
    }

    // Log and respond with success message
    console.log("Deleted blog", deletedBlog);
    res.status(200).json({
      message: "Blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    // Log the error and respond with an internal server error
    console.error("Failed to delete the blog", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function handleGetPost(req, res) {
  // send the username of the user and fetch all the posts regarding it
  try {
    const allPosts = await Post.find();
    if (!allPosts) {
      console.error("Blogs doesn't exist");
      res.status(400).json({ message: "Blogs doesn't exist" });
    }
    res.status(200).json({
      message: "Fetch success",
      allPosts,
    });
  } catch (error) {
    console.error("Failed to fetch the blogs", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  handleBlogPost,
  handleBlogUpdate,
  handleBlogDelete,
  handleGetPost,
};
