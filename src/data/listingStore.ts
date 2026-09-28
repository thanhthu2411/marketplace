import type { Listing } from "../types/listing.ts"


const listings: Listing[] = []

const getAll = (): Listing[] => {
    return listings
}

export { getAll }