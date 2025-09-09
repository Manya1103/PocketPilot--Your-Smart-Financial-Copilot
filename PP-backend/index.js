import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
