import { Router } from "express";
import {
  getAllListings,
  getListingDetail,
  createListing,
  deleteListing,
  updateListing
} from "../controllers/listingController.js";

const router = Router();

router.get("/", getAllListings);
router.post("/", createListing);
router.delete("/:id", deleteListing);
router.get("/:id", getListingDetail); 
router.put("/:id", updateListing)

export default router;

