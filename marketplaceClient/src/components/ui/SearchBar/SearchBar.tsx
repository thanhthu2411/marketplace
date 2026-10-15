import "./SearchBar.css"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Search listings..." }: SearchBarProps) {
    return (
    <div className="search-bar">
      <Search size={18} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search listings"
      />
    </div>
  )
}