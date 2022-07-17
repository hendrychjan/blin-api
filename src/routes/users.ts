import express from "express";
import UserService, { UserPayload } from "../services/userService";
const router = express.Router();

// @route   POST users/new
// @desc    Create a new user
// @access  Public
router.post("/new", async (req, res) => {
  try {
    const token = await UserService.register(req.body as UserPayload);
    res.status(200).send(token);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
