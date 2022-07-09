// Setup all the endpoints for the API

module.exports = (app: any) => {
  const ping = require("../routes/ping");
  const users = require("../routes/users");
  const auth = require("../routes/auth");
  const categories = require("../routes/categories");

  app.use("/ping", ping);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/categories", categories);
}