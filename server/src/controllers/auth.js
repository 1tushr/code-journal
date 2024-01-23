const User = require("../models/user");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
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
    
  } catch (error) {}
}
async function handleLogout(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
};
