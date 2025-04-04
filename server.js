const express = require("express");
const dotenv = require("dotenv"); // Don't call config() here
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path  = require('path')

// Load environment variables FIRST
dotenv.config();

// Check if MONGO_URL exists
if (!process.env.MONGO_URL) {
  console.error("❌ ERROR: MONGO_URL is not defined in .env file!");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server Running in ${process.env.DEV_MODE || "development"} mode on port ${PORT}`.bgBlue.white);
});
