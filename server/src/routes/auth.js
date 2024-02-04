const express = require("express");
const authRouter = require("express").Router();
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/auth");

authRouter
  .post("/signup", handleSignup) // create new user
  .post("/login", handleLogin) // login the user
  .get("/logout", handleLogout); // logout the user

module.exports = authRouter;
