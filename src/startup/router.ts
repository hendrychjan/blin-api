// Setup all the endpoints for the API

module.exports = (app: any) => {
  const ping = require("../routes/ping");
  const users = require("../routes/users");
  const auth = require("../routes/auth");

  app.use("/ping", ping);
  app.use("/users", users);
  app.use("/auth", auth);
}