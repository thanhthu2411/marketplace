import type { Request, Response, NextFunction } from "express";
import { listingStore } from "../data/listingStore.js";
import { validateListing } from "../utils/validation.js";
import { cleanDetails } from "../config/categoryFields.js";

const getAllListings = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const all = await listingStore.getAll();
    const listings = category
      ? all.filter((l) => l.category === category)
      : all;
    return res.json(listings);
  } catch {
    return res.status(500).json({ error: "Could not load listings" });
  }
};

const getListingDetail = async (req: Request, res: Response) => {
  try {
    const listing = await listingStore.getById(String(req.params.id))
    if (!listing) return res.status(404).json({ error: "Listing not found" })
    return res.json(listing)
  } catch {
    return res.status(500).json({ error: "Could not load listing" })
  }
}

const createListing = async (req: Request, res: Response) => {
  try {
    const { title, price, category, description, address, details } = req.body
    const numericPrice = Number(price)

    const [isValid, error] = validateListing(title, numericPrice, category, address)
    if (!isValid) return res.status(400).json({ error })

    const newListing = await listingStore.create(title, numericPrice, category, description, address, cleanDetails(category, details))
    return res.status(201).json(newListing)
  } catch {
    return res.status(500).json({ error: "Could not create listing" })
  }
}


const deleteListing = async (req: Request, res: Response) => {
  try {
    const removed = await listingStore.remove(String(req.params.id))
    if (!removed) return res.status(404).json({ error: "Listing not found" })
    return res.status(204).send()
  } catch {
    return res.status(500).json({ error: "Could not delete listing" })
  }
}

export { getAllListings, getListingDetail, createListing, deleteListing };
