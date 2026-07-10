import "dotenv/config";

import app from "./app.js";
import prisma from "./prisma/client.js";

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();

    console.log("Connected to PostgreSQL");

    app.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database");
    console.error(error);

    process.exit(1);
  }
}

startServer();