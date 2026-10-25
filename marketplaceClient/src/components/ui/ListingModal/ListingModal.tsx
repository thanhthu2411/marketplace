import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "../Button/Button"
import { createListing } from "../../../services/listing.service"
import type { Listing, NewListing, Details } from "../../../types/listing"
import "./ListingModal.css"
import type { FieldConfig } from "../../../config/categoryFields"
import { categoryFields } from "../../../config/categoryFields"


interface ListingModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (listing: Listing) => void
}

const emptyForm: NewListing = {
  title: "",
  description: "",
  price: 0,
  category: "books",
  address: "",
}

export function ListingModal({ isOpen, onClose, onCreated }: ListingModalProps) {
  const [form, setForm] = useState<NewListing>(emptyForm)
  const [details, setDetails] = useState<Details>({})
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === "category") setDetails({})
    setForm((prev) => ({ ...prev, [name]: name === "price" ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const created = await createListing({ ...form, details })
      onCreated(created)
      setForm(emptyForm)
      setDetails({})
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  const handleDetail = (field: FieldConfig, value: string) => {
    setDetails((prev) => ({
      ...prev,
      [field.name]: field.type === "number" && value !== "" ? Number(value) : value,
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <Button variant="secondary" icon={X} size="small" aria-label="Close" onClick={onClose} className="modal-close" />
        <h2>Add New Listing</h2>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Title *
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>Description
            <textarea name="description" value={form.description} onChange={handleChange} />
          </label>
          <label>Price ($) *
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </label>
          <label>Category *
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* OPTIONAL DETAILS  */}

          {categoryFields[form.category].map((field) => (
            <label key={field.name}>{field.label}
              {field.type === "select" ? (
                <select value={details[field.name] ?? ""} onChange={(e) => handleDetail(field, e.target.value)}>
                  <option value="">Select...</option>
                  {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
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


          <label>Address / Pickup Location *
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>
          <Button className="submit-btn" type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}
