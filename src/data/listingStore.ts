import type { Listing } from "../types/listing.ts"


const listings: Listing[] = []
let nextId = 1;

const getAll = (): Listing[] => {
    return listings
}


const create = (title: string, description: string, price: number, category: Listing["category"]): Listing => {
    const newListing: Listing = {
        id: nextId++,
        title,
        description: description ? description : "No description",
        price,
        category,
        isSold: false,
        createdAt: new Date()
    }

    listings.push(newListing)
    return newListing
}

export { getAll, create }