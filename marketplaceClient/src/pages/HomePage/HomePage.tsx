import './HomePage.css'
import { ListingCard } from '../../components/ui/ListingCard/ListingCard'
import { Link, useOutletContext } from 'react-router'
import { Button } from '../../components/ui/Button/Button'
import { Plus } from 'lucide-react'
import { useListings } from '../../context/useListings'

type OutletContextType = { onOpenModal: () => void }

export function HomePage() {
  const { listings } = useListings()
  const { onOpenModal } = useOutletContext<OutletContextType>()

  const recent = [...listings].reverse().slice(0, 5)

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

        {recent.length === 0 ? (
          <p>No listings yet.</p>
        ) : (
          <div className="listings-grid">
            {recent.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>
    </div>
  )

}
