const express = require('express')
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 4000

//middleware 
app.use(express.json())

const todoRoutes = require('./routes/todos')
// mount path
app.use("/api/v1", todoRoutes)

const blogRoutes = require('./routes/blogs')
app.use("/api/blog", blogRoutes)

app.listen(PORT, () => {
    console.log(`Server running at ${PORT} PORT`)
})

const dbConnect = require("./config/database")
dbConnect()

app.get("/", (req, res) => {
    res.send(`<h1> This is Homepage</h1>`)
})