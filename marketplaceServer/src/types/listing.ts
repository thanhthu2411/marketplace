import { ObjectId } from "mongodb"

export type Category = "books" | "furniture" | "electronics" | "other"

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
    details?: Details
}

export interface Listing extends Omit<ListingDoc, "_id"> {
    id: string
}

export type Details = Record<string, string | number>




