import './AllListingsPage.css'

import { useState } from "react"
// import { useOutletContext } from "react-router"
import { SearchBar } from "../../components/ui/SearchBar/SearchBar"
import { ListingCard } from "../../components/ui/ListingCard/ListingCard"
import { useListings } from '../../context/useListings'
export function AllListingsPage() {
  const { listings } = useListings()
  const [search, setSearch] = useState("")

  const filtered = listings.filter((l) =>
    l.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <div className="home">
      <div className="home-header">
        <h1>All Listings</h1>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {filtered.length === 0 ? (
        <p className="empty-text">No listings match your search.</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  )
}
