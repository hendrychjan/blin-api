import {connect} from "mongoose";

module.exports = () => {
  let conn = process.env.DB_URL!;

  connect(conn).then(() => console.log("...Connected to MongoDB"));
};
