import express from "express";
import quizController from "../controller/quizController.js"; // Add '.js' extension

const quizRouter = express.Router();

// Route to get a message
quizRouter.get("/", quizController.get);

// Route to get Pokémon image by index
quizRouter.get("/image/:index", quizController.getImage);

export default quizRouter;
