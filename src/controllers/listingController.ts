import type { Request, Response, NextFunction } from "express";
import { getAll, getById, create, remove } from "../data/listingStore.js";

const getAllListings = (req: Request, res: Response, next: NextFunction) => {
  // const category = req.query.category as string | undefined;
  // const all = getAll();
  // const listings = category ? all.filter((l) => l.category === category) : all;

  const listings = getAll()

  return res.render("index", { listings});
};

const getListingDetail = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const listing = getById(id);

  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  return res.render("detail", { listing });
};

const createListing = (req: Request, res: Response, next: NextFunction) => {
  const { title, price, category, description, address } = req.body;
  create(title, Number(price), category, description, address);
  return res.redirect("/listings");
};

const deleteListing = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  remove(id);
  return res.redirect("/listings");
};

export { getAllListings, getListingDetail, createListing, deleteListing };