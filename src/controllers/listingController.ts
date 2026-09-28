import {getAll} from "../data/listingStore.js"
import type { Request, Response, NextFunction } from "express";

const getAllListings = (req: Request, res: Response, next: NextFunction) => {
    const listings = getAll()
    return res.render("index", {
        listings
    })
}


export {getAllListings}