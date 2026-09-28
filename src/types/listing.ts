
export interface Listing {
    id: number
    title: string
    description: string
    price: number
    category: "books" | "furniture" | "electronics" | "other"
    isSold: boolean
    createdAt: Date 
}




