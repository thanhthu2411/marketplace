import type { Request, Response, NextFunction } from "express";
import { listingStore } from "../data/listingStore.js";
import { validateListing } from "../utils/validation.js";

const getAllListings = (req: Request, res: Response, next: NextFunction) => {

  const listings = listingStore.getAll()

  return res.json(listings);
};

const getListingDetail = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const listing = listingStore.getById(id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  return res.json(listing);
};

const createListing = (req: Request, res: Response, next: NextFunction) => {
  const { title, price, category, description, address } = req.body;
  const priceNum = Number(price)

  const [isValid, error] = validateListing(title, priceNum, category, address)

  if (!isValid) {
    return res.status(400).json({ error });
  }

  const newListing = listingStore.create(title, Number(price), category, description, address);
  return res.status(201).json(newListing);
};

const deleteListing = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const removed = listingStore.remove(id);
  if(!removed) {
    return res.status(404).json({error: "Listing not found"})
  }
  return res.status(204).send()
};

export { getAllListings, getListingDetail, createListing, deleteListing };