import './ListingCard.css'
import { Link } from "react-router"
import type { Listing } from "../../../types/listing"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({listing} : ListingCardProps) {
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
            </div>
    </Link>
    )
}