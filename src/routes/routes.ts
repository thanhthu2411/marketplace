import {Router} from "express"
import { getAllListings, createNewListing } from "../controllers/listingController.js"

const router = Router()

router.get("/", getAllListings)
router.post("/", createNewListing)


export default router