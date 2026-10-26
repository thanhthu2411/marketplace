import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router"
import { ArrowLeft, MapPin, Trash2 } from "lucide-react"
import { getListingById } from "../../services/listing.service"
import type { Listing } from "../../types/listing"
import { categoryFields } from "../../config/categoryFields"
import { Button } from "../../components/ui/Button/Button"
import { useListings } from "../../context/useListings"
import "./ListingDetailPage.css"

export function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { deleteListing } = useListings()

  useEffect(() => {
    const loadListing = async () => {
      try {
        const data = await getListingById(String(id))
        setListing(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    loadListing()
  }, [id])

  const handleDelete = async () => {
    if (!listing) return
    if (!window.confirm(`Delete "${listing.title}"?`)) return
    try {
      await deleteListing(listing.id)
      navigate("/listings")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete listing")
    }
  }

  if (loading) return <div className="detail"><p>Loading...</p></div>

  if (error || !listing) {
    return (
      <div className="detail">
        <Link to="/listings" className="back-link"><ArrowLeft size={16} /> Back to listings</Link>
        <p className="detail-error">{error ?? "Listing not found"}</p>
      </div>
    )
  }

  return (
    <div className="detail">
      <Link to="/listings" className="back-link">
        <ArrowLeft size={16} /> Back to listings
      </Link>

      <div className="detail-thumb">
        {listing.category.charAt(0).toUpperCase()}
      </div>

      <div className="detail-top">
        <span className="detail-price">${listing.price}</span>
        <span className="detail-tag">{listing.category}</span>
      </div>

      <h1 className="detail-title">{listing.title}</h1>
      <p className="detail-meta">
        Posted {new Date(listing.createdAt).toLocaleDateString()}
      </p>

      <p className="detail-description">{listing.description}</p>

      <div className="detail-info-box">
        <span className="detail-info-label"><MapPin size={14} /> Pickup location</span>
        <span>{listing.address}</span>
      </div>

      {listing.details && Object.keys(listing.details).length > 0 && (
        <div className="additional-info-box">
          {categoryFields[listing.category].map((f) =>
            listing.details?.[f.name] ? (
              <div className="detail-field" key={f.name}><strong>{f.label}:</strong> {listing.details[f.name]}</div>
            ) : null
          )}
        </div>
      )}

      <Button className="delete-btn" variant="danger" icon={Trash2} onClick={handleDelete}>
        Delete listing
      </Button>
    </div>
  )
}