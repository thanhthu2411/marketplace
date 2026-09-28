import {getAll, create} from "../data/listingStore.js"
import type { Request, Response, NextFunction } from "express";

const getAllListings = (req: Request, res: Response, next: NextFunction) => {
    const listings = getAll()
    return res.render("index", {
        listings
    })
}

const createNewListing = (req: Request, res: Response, next: NextFunction) => {
    const {title, description, price, category} = req.body()
    create(title, description, Number(price), category)
    return res.redirect("/listings")
}


export {getAllListings, createNewListing}