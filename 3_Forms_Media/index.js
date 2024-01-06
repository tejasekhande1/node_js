const express = require("express");
const app = express()
require('dotenv').config()

const PORT = process.env.PORT;

app.use(express.json())

const fileUpload = require("express-fileupload")
app.use(fileUpload());

const { dbConnect } = require("./config/database")
dbConnect();

const { cloudinaryConnect } = require("./config/cloudnary")
cloudinaryConnect();

const upload = require("./routes/fileUpload")
app.use('/api/v1/upload', upload)

app.listen(PORT, () => {
    console.log("Server running at ", PORT);
})