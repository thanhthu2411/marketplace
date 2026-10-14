import { Router } from "express";
import {
  getAllListings,
  getListingDetail,
  createListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = Router();

router.get("/", getAllListings);
router.post("/", createListing);
router.delete("/:id", deleteListing);
router.get("/:id", getListingDetail); 

export default router;