// Include middleware specific for production environment

const helmet = require("helmet");
const compression = require("compression");

module.exports = (app: any) => {
  app.use(helmet());
  app.use(compression());
};
