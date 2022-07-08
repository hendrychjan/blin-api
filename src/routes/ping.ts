// Test the server status and functionality

import * as express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Running on ${process.env.NODE_ENV} environment`);
});

module.exports = router;
