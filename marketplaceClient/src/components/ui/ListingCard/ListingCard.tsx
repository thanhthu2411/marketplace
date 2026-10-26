import './ListingCard.css'
import { Link } from "react-router"
import type { Listing } from "../../../types/listing"
import { Trash2 } from "lucide-react"
import { Button } from "../Button/Button"
import { useListings } from "../../../context/useListings"

interface ListingCardProps {
    listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
    const { deleteListing } = useListings()

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()    // don't follow the link
        e.stopPropagation()
        if (!window.confirm(`Delete "${listing.title}"?`)) return
        try {
            await deleteListing(listing.id)
        } catch (err) {
            alert(err instanceof Error ? err.message : "Could not delete listing")
        }
    }

    return (
        <Link to={`/listings/${listing.id}`} className="listing-card">
            <div className="listing-thumb">
                {listing.category.charAt(0).toUpperCase()}
            </div>
            <div className="listing-body">
                <div className="listing-top">
                    <span className="price">${listing.price}</span>
                    <span className="tag">{listing.category}</span>
                </div>
                <h3 className="title">{listing.title}</h3>
                <p className="description">{listing.description}</p>
                <span className="posted">
                    Posted {new Date(listing.createdAt).toLocaleDateString()}
                </span>
                <Button className='delete-btn'
                    variant="secondary"
                    size="small"
                    icon={Trash2}
                    aria-label={`Delete ${listing.title}`}
                    onClick={handleDelete}
                />
            </div>
        </Link>
    )
}