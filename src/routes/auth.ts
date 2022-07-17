import express from "express";
import UserService, { UserPayload } from "../services/userService";

const router = express.Router();

// @route   POST auth/
// @desc    Authenticate a user and get a token
// @access  Public
router.post("/", async (req, res) => {
  try {
    const token: string = await UserService.login(req.body as UserPayload);
    res.status(200).send(token);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;