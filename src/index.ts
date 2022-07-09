// Read environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

// Setup the express server
const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;

// Run all other initialization procedures
if (process.env.NODE_ENV === "production") {
  require("./startup/prod")(app);
}
require("./startup/api")(app);
require("./startup/router")(app);
require("./startup/db")();

// Start the http server
const server = http.listen(port, () => {
  console.log(`...Server listening on port ${port}`);
});

module.exports = server;
