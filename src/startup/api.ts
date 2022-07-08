// Hook up all the middleware that is necessary for every environment.

module.exports = (app: any) => {
  const express = require("express");
  const cors = require("cors");
  const morgan = require("morgan");

  // CORS configuration
  const CORS_CONFIG = {
    origin: "*",
  };

  app.use(cors(CORS_CONFIG));
  app.use(morgan(process.env.MORGAN_FORMAT));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
