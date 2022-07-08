import express from "express";
import User, {UserType} from "../models/user";
const router = express.Router();

// @route   POST users/new
// @desc    Create a new user
// @access  Public
router.post("/new", async (req, res) => {
  const token = await User.createNew(req.body as UserType);
  res.send(token);
});

module.exports = router;
