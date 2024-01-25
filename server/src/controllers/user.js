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

module.exports = handleUpdate;
