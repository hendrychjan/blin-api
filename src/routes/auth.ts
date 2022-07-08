import express from "express";
import User from "../models/user";

const router = express.Router();

// @route   POST auth/
// @desc    Authenticate a user and get a token
// @access  Public
router.post("/", async (req, res) => {
  try {
    const token = await User.login(req.body.name, req.body.password);
    res.status(200).send(token);
  } catch (ex: any) {
    res.status(400).send(ex.message);
  }
});

module.exports = router;