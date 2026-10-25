import type { Category, Details } from "../types/listing.js"

export const categoryFields: Record<Category, string[]> = {
  books: ["author", "edition"],
  furniture: ["dimensions", "color"],
  electronics: ["brand", "warranty"],
  other: [],
}

// keep only the allowed keys for this category, with non-empty values
export function cleanDetails(category: Category, details: unknown): Details {
  const result: Details = {}
  if (typeof details !== "object" || details === null) return result

  for (const key of categoryFields[category]) {
    const value = (details as Record<string, unknown>)[key]
    if (typeof value === "number") result[key] = value
    else if (typeof value === "string" && value.trim()) result[key] = value.trim()
  }
  return result
}