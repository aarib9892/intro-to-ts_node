"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Todo was created" });
});
router.put("/todo/:todoId", (req, res, next) => {
    const todoToUpdate = todos.findIndex((todoItem) => todoItem.id === req.params.todoId);
    if (todoToUpdate >= 0) {
        todos[todoToUpdate] = { id: todos[todoToUpdate].id, text: req.body.text };
        return res.status(200).json({ message: "Todo was updated", todos: todos });
    }
    res.status(404).json({ message: "Failed to update" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
    res.status(200).json({ message: "Todo Deleted Successfully", todos: todos });
});
exports.default = router;
