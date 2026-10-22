import "dotenv/config";
import express from "express"
import path from "path"
import router from "./routes/routes.js"
import { fileURLToPath } from "url"
import { listingStore } from "./data/listingStore.js"
import cors from "cors"
import mongodb from "./config/db.js"


const app = express()

const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors())


app.use("/api/listings", router)

// listingStore.seed()

mongodb.connectDb((err:Error) => {
  if (err) {
    console.error("Error initializing database:", err);
    return;
  } else {
    // Start the server after successful initialization of the database
      const server = app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/api/listings`));

      if (process.env.NODE_ENV === 'production') {
        // we only want this to happen in production
      // Graceful Shutdown for SIGTERM (e.g., Heroku/AWS/Kubernetes restarts)
      process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
          console.log('💥 Process terminated!');
        });
      });
    }
}
});

