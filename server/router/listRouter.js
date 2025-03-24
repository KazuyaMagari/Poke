import express from "express";
const  listRouter= express.Router();
import ListController from "../controller/ListController.js";
listRouter.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

listRouter.post("/:userId/:index", ListController.addList);

export default listRouter