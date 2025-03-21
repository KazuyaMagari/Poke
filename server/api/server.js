import express from "express";
import cors from "cors";
import quizRouter from "../router/quizRouter.js"; // Ensure the import name matches

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

// Use the quizRouter for '/quiz' routes
app.use("/quiz", quizRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
