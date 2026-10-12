import { useEffect, useState } from 'react'
import './App.css'

type Listing = {
  id: number
  title: string
  price: number
  category: string
  description: string
  location: string
}

function App() {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/data/listings.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load listings.')
        return response.json() as Promise<Listing[]>
      })
      .then(setListings)
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main className="marketplace">
      <header className="site-header">
        <div>
          <p className="eyebrow">Campus Marketplace</p>
          <h1>Find what you need. Sell what you don’t.</h1>
        </div>
        <button className="primary-button" type="button">Post an item</button>
      </header>

      <section className="toolbar" aria-label="Listing filters">
        <input type="search" placeholder="Search listings" aria-label="Search listings" />
        <button className="filter-button" type="button">All categories</button>
      </section>

      <section className="content">
        <div className="section-heading">
          <h2>Latest listings</h2>
          <span>{listings.length} items</span>
        </div>
        {isLoading && <p className="status">Loading listings…</p>}
        {error && <p className="status error">{error}</p>}
        {!isLoading && !error && (
          <div className="listing-grid">
            {listings.map((listing) => (
              <article className="listing-card" key={listing.id}>
                <div className="listing-image" aria-hidden="true">
                  {listing.category.charAt(0).toUpperCase()}
                </div>
                <div className="listing-details">
                  <div className="listing-topline">
                    <span className="category">{listing.category}</span>
                    <strong>${listing.price.toFixed(2)}</strong>
                  </div>
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <small>{listing.location}</small>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
