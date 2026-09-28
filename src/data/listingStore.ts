import type { Listing } from "../types/listing.ts"


const listings: Listing[] = []

const getAll = () => {
    return listings
}

export { getAll }