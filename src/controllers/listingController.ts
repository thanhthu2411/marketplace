import type { Request, Response, NextFunction } from "express";
import { listingStore } from "../data/listingStore.js";
import { validateListing } from "../utils/validation.js";

const getAllListings = (req: Request, res: Response, next: NextFunction) => {
  // const category = req.query.category as string | undefined;
  // const all = getAll();
  // const listings = category ? all.filter((l) => l.category === category) : all;

  const listings = listingStore.getAll()

  return res.render("index", { listings});
};

const getListingDetail = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const listing = listingStore.getById(id);

  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  return res.render("detail", { listing });
};

const createListing = (req: Request, res: Response, next: NextFunction) => {
  const { title, price, category, description, address } = req.body;
  const priceNum = Number(price)

  const [isValid, error] = validateListing(title, priceNum, category, address)

  if (!isValid) {
    return res.redirect("/listings");
  }
  
  listingStore.create(title, Number(price), category, description, address);
  return res.redirect("/listings");
};

const deleteListing = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  listingStore.remove(id);
  return res.redirect("/listings");
};

export { getAllListings, getListingDetail, createListing, deleteListing };