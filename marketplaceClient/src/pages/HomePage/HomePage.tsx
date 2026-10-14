import './HomePage.css'
import type { Listing } from '../../types/listing'
import { ListingCard } from '../../components/ui/ListingCard/ListingCard'
import { Link, useOutletContext } from 'react-router'
import { Button } from '../../components/ui/Button/Button'
import { Plus } from 'lucide-react'
import type { AppOutletContext } from "../../components/layout/AppFrame/AppFrame"

export function HomePage() {
  const { listings, onOpenModal } = useOutletContext<AppOutletContext>()

  return (
    <div className="home">
      <div className="home-header">
        <h1>Hello, User</h1>
        <Button icon={Plus} onClick={onOpenModal}>Create Listing</Button>
      </div>

      <section className="home-section">
        <div className="section-header">
          <h2>Recently added</h2>
          <Link to="/listings" className="view-all">View all &rarr;</Link>
        </div>

        {listings.length === 0 ? (
          <p>No listings yet.</p>
        ) : (
          <div className="listings-grid">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>
    </div>
  )

}
