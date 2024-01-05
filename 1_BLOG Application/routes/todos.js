const express = require("express")
const router = express.Router()

const {createTodo, getTodo, getTodoById, updateTodo,deleteTodo} = require("../controllers/createTodo")

router.post("/createTodo", createTodo)
router.get("/getTodo", getTodo)
router.get("/getTodo/:id", getTodoById)
router.put("/updateTodo/:id", updateTodo)
router.delete("/deleteTodo/id",deleteTodo)

module.exports = router