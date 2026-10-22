import { ObjectId } from "mongodb"

export type Category = "books" | "furniture" | "electronics" | "clothes" | "other"

export interface ListingDoc {
    _id?: ObjectId
    title: string
    description?: string
    price: number
    category: Category
    address: string
    isSold: boolean
    imageUrl?: string
    createdAt: Date 
}

export interface Listing extends Omit<ListingDoc, "_id"> {
    id: string
}



