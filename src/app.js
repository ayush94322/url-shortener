import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);

app.use((err, req, res, next) => {
  if(err.message === "URL_NOT_FOUND"){
    return res.status(404).json({
      success:false,
      message:"Short URL not found"
    });
  }

  if(err.message === "URL_EXPIRED"){
    return res.status(410).json({
      success:false,
      message:"URL has expired"
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

export default app;