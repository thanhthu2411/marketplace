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
router.post("/:id/delete", deleteListing);
router.get("/:id", getListingDetail); // keep this below /:id/delete

export default router;