const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");

dotenv.config();

const app = express();
connectDB(); // connection to database
// Body parser
app.use(express.json());
// Enable CORS
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
