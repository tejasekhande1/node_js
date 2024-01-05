const express = require("express");
const app = express();
require('dotenv').config

const PORT = process.env.PORT || 4000

app.use(express.json());

const {dbConnect} = require("./config/database")
dbConnect();

const user = require("./routes/user")
app.use("/api/user",user)

app.listen(PORT, () => {
  console.log(`Server starting at ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send("This is home page");
});
