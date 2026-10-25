// server/src/scripts/seed.ts
import "dotenv/config"
import mongoDb from "./db.js"
import { listingStore } from "../data/listingStore.js"

mongoDb.connectDb(async (err: Error | null) => {
  if (err) {
    console.error("Could not connect:", err)
    process.exit(1)
  }

  try {
    await mongoDb.getDb().collection("listings").deleteMany({}) 
    await listingStore.seed()                            
    console.log("Reseeded")
    process.exit(0)
  } catch (e) {
    console.error("Seeding failed:", e)
    process.exit(1)
  }
})