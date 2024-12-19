import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors()); // Pertimbangkan opsi CORS yang lebih spesifik untuk keamanan

// Database Connection
connectDB()
  .then(() => {
    console.log("DB Connected");

    // API Endpoints
    app.use("/api/user", userRouter);
    app.use("/api/food", foodRouter);
    app.use("/images", express.static("uploads"));
    app.use("/api/cart", cartRouter);
    app.use("/api/order", orderRouter);

    app.get("/", (req, res) => {
      res.send("API Working");
    });

    // 404 Not Found Handler
    app.use((req, res, next) => {
      res.status(404).send("404 Not Found");
    });

    // Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
    });

    // Start Server
    app.listen(port, () =>
      console.log(`Server started on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Exit process with failure
  });