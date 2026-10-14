export type Category = "books" | "furniture" | "electronics" | "other"

export interface Listing {
    id: number
    title: string
    description?: string
    price: number
    category: "books" | "furniture" | "electronics" | "other"
    address: string
    isSold: boolean
    imageUrl?: string
    createdAt: Date 
}

// types/listing.ts
export type NewListing = Omit<Listing, "id" | "isSold" | "createdAt">




