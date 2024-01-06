const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => console.log("Connection Successful"))
    .catch((error) => {
      console.log("Issue in Connection");
      console.log("DB : ", process.env.DATABASE_URL);
      console.error(error);
      process.exit(1);
    });
};

module.exports = { dbConnect };
