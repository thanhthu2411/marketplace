import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { getListings, deleteListing as deleteListingRequest } from "../services/listing.service"
import type { Listing } from "../types/listing"

interface ListingContextValue {
  listings: Listing[]
  loading: boolean
  error: string | null
  addListing: (listing: Listing) => void
  deleteListing: (id:string) => Promise<void>
}


 
const ListingContext = createContext<ListingContextValue | null>(null)

export function ListingProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setListings(await getListings())
      } catch {
        setError("Could not load listings")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addListing = (listing: Listing) =>
    setListings((prev) => [...prev, listing])

  // const removeListing = (id: number) =>
  //   setListings((prev) => prev.filter((l) => l.id !== id))

  const deleteListing = async (id: string) => {
    await deleteListingRequest(id)
    setListings((prev) => prev.filter((l) => l.id !== id)) 
  }

  return (
    <ListingContext.Provider
      value={{ listings, loading, error, addListing, deleteListing }}
    >
      {children}
    </ListingContext.Provider>
  )
}

export { ListingContext }
