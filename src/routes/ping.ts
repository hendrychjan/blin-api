// Test the server status and functionality

import express, {Request, Response} from "express";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Running on ${process.env.NODE_ENV} environment`);
});

router.get("/auth", [auth], (req: Request, res: Response) => {
  res.send("You are authenticated");
});

module.exports = router;
