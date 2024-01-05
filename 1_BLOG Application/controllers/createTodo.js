const Todo = require('../models/todo')

exports.createTodo = async (req, res) => {
    try {
        const {title, description} = req.body
        const response = await Todo.create({title, description})
        res.status(200).json({
            success: true, data: response, message: "Entry Created Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const response = await Todo.find({})
        res.status(200).json({
            success: true, data: response, message: "Data Fetch Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await Todo.findById({_id: id})

        if (!response) {
            res.status(404).json({
                success: false, message: "Todo Not Found"
            })
        }

        res.status(200).json({
            success: true, data: response, message: "Data Fetch Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const todo = await Todo.findByIdAndUpdate({_id: id}, {title, description, updatedAt: Date.now()},)

        if (!todo) {
            res.status(404).json({
                success: false, message: "Todo Not Found"
            })
        }

        res.status(200).json({
            success: true, data: todo, message: "Data updated Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        const response = await Todo.findByIdAndDelete({_id: id})
        if (!response) {
            res.status(404).json({
                success: false, message: "Todo Not Found"
            })
        }

        res.status(200).json({
            success: true, data: response, message: "Data updated Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}