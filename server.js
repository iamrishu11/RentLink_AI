import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import tenantRoutes from "./routes/tenants.js"; // Ensure the file exists

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Log MONGODB_URI to check if it is loading correctly
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing in .env file");
  process.exit(1);
} else {
  console.log("MONGODB_URI loaded successfully");
}

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Removed deprecated options
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Stops the server if MongoDB connection fails
  }
}

connectDB();

app.use("/api/tenants", tenantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
