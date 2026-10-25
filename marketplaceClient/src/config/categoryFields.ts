import type { Category } from "../types/listing"

export interface FieldConfig {
  name: string
  label: string
  type: "text" | "number" | "select"
  options?: string[]
}

export const categoryFields: Record<Category, FieldConfig[]> = {
  books: [
    { name: "author", label: "Author", type: "text" },
    { name: "edition", label: "Edition", type: "number" },
  ],
  furniture: [
    { name: "dimensions", label: "Dimensions", type: "text" },
    { name: "color", label: "Color", type: "text" },
  ],
  electronics: [
    { name: "brand", label: "Brand", type: "text" },
    { name: "warranty", label: "Warranty", type: "select", options: ["None", "Under 1 year", "1 year+"] },
  ],
  other: [],
}