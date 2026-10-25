import type { Listing, NewListing } from "../types/listing"

const API_URL = "http://localhost:3000/api/listings"


export async function getListings(): Promise<Listing[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to load listings")
  return res.json()
}

export async function getListingById(id: string): Promise<Listing> {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error("Listing not found")
  return res.json()
}


export async function createListing(data: NewListing): Promise<Listing> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json()
    throw new Error(body.error ?? "Failed to create listing")
  }
  return res.json()
}

