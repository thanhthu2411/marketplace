import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "../Button/Button"
import type { Listing, NewListing, Details } from "../../../types/listing"
import "./ListingModal.css"
import type { FieldConfig } from "../../../config/categoryFields"
import { categoryFields } from "../../../config/categoryFields"
import { useListings } from '../../../context/useListings'



interface ListingModalProps {
  isOpen: boolean
  onClose: () => void
  listing?: Listing | null // present = edit mode, null = create mode
}

const emptyForm: NewListing = {
  title: "",
  description: "",
  price: 0,
  category: "books",
  address: "",
}

export function ListingModal({ isOpen, onClose, listing }: ListingModalProps) {
  const { addListing, updateListing } = useListings()
  const [form, setForm] = useState<NewListing>(emptyForm)
  const [details, setDetails] = useState<Details>({})
  const [error, setError] = useState<string | null>(null)
  const isEditing = Boolean(listing)

  // Runs each time the modal opens (or the listing changes):
  // fill the form for edit mode, or reset it for create mode
  useEffect(() => {
    if (!isOpen) return

    if (listing) {
      setForm({
        title: listing.title,
        description: listing.description ?? "",
        price: listing.price,
        category: listing.category,
        address: listing.address,
      })
      setDetails(listing.details ?? {})
    } else {
      setForm(emptyForm)
      setDetails({})
    }
    setError(null)
  }, [isOpen, listing])

  // must come AFTER all hooks
  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === "category") setDetails({}) // old fields shouldn't carry over
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  const handleDetail = (field: FieldConfig, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field.name]: field.type === "number" && value !== "" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = { ...form, details }
      if (listing) {
        await updateListing(listing.id, payload)
      } else {
        await addListing(payload)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="secondary"
          icon={X}
          size="small"
          aria-label="Close"
          onClick={onClose}
          className="modal-close"
        />
        <h2>{isEditing ? "Edit Listing" : "Add New Listing"}</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>
            Title *
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>

          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} />
          </label>

          <label>
            Price ($) *
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category *
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </label>

          {categoryFields[form.category].map((field) => (
            <label key={field.name}>
              {field.label}
              {field.type === "select" ? (
                <select
                  value={details[field.name] ?? ""}
                  onChange={(e) => handleDetail(field, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={details[field.name] ?? ""}
                  onChange={(e) => handleDetail(field, e.target.value)}
                />
              )}
            </label>
          ))}

          <label>
            Address / Pickup Location *
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>

          <Button type="submit">{isEditing ? "Save changes" : "Submit"}</Button>
        </form>
      </div>
    </div>
  )
}