import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import { getListings, createListing as createListingRequest, deleteListing as deleteListingRequest, updateListing as updateListingRequest } from "../services/listing.service"
import type { Listing, NewListing } from "../types/listing"

interface ListingContextValue {
  listings: Listing[]
  loading: boolean
  error: string | null
  addListing: (data: NewListing) => Promise<Listing>   
  updateListing: (id: string, data: NewListing) => Promise<Listing>
  deleteListing: (id: string) => Promise<void>
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

  const addListing = async (data: NewListing) => {
    const created = await createListingRequest(data)   // server first
    setListings((prev) => [...prev, created])          // then the screen
    return created
  }

  // const removeListing = (id: number) =>
  //   setListings((prev) => prev.filter((l) => l.id !== id))

  const deleteListing = async (id: string) => {
    await deleteListingRequest(id)
    setListings((prev) => prev.filter((l) => l.id !== id))
  }

  const updateListing = async (id: string, data: NewListing) => {
    const updated = await updateListingRequest(id, data)
    console.log("updated from server:", updated)
    setListings((prev) => prev.map((l) => (l.id === id ? updated : l)))
    return updated
  }

  return (
    <ListingContext.Provider
      value={{ listings, loading, error, addListing, deleteListing, updateListing }}
    >
      {children}
    </ListingContext.Provider>
  )
}

export { ListingContext }
