import { useContext } from "react"
import { ListingContext } from "./ListingContext"

// Keep the hook in its own module so the provider module only exports a component.
export function useListings() {
  const ctx = useContext(ListingContext)
  if (!ctx) {
    throw new Error("useListings must be used inside a ListingProvider")
  }
  return ctx
}
