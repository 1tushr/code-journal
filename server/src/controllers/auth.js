const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const dotenv = require("dotenv");

dotenv.config();

async function handleSignup(req, res) {
  try {
    const { email, username, password } = req.body;
    const hashpass = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      username,
      email,
      password: hashpass,
    });
    console.log("User created successfully:", newUser);
    res.json(newUser);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function handleLogin(req, res) {
  try {
    const { email, username, password } = req.body;
    const matchUser = await User.findOne({ $or: [{ email }, { username }] });

    if (!matchUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, matchUser.password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: matchUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRY_TIME,
    });

    // Respond with success message and user details
    res
      .cookie("token", token)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: matchUser._id,
          username: matchUser.username,
          email: matchUser.email,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleLogout(req, res) {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("user logged out successfully")
      .redirect("http://localhost:3000/user/auth/login");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};
