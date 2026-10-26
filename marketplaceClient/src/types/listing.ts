export type Category = "books" | "furniture" | "electronics" | "other"

export interface Listing {
    id: string
    title: string
    description?: string
    price: number
    category: "books" | "furniture" | "electronics" | "other"
    address: string
    isSold: boolean
    imageUrl?: string
    createdAt: Date 
    details?: Details
}

// types/listing.ts
export type NewListing = Omit<Listing, "id" | "isSold" | "createdAt">

export type Details = Record<string, string | number>

