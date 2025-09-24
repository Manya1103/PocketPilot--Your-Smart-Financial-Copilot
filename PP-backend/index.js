import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/mongoDB.js';
import expenseRoutes from './routes/expenseRoutes.js'; // Import the new router

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello from backend!");
});

app.use('/api/expenses', expenseRoutes); // Add the new expense routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});