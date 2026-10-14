import { Outlet } from 'react-router'
import { Header } from '../Header/Header'
import { useEffect, useState } from "react"
import { ListingModal } from "../../ui/ListingModal/ListingModal"
import { getListings } from "../../../services/listing.service"
import type { Listing } from "../../../types/listing"
import type { Theme } from '../../../types/theme'
import './AppFrame.css'

interface AppFrameProps {
  theme: Theme
  onToggleTheme: () => void
}

export type AppOutletContext = {
  listings: Listing[]
  onOpenModal: () => void
}

export function AppFrame({ theme, onToggleTheme }: AppFrameProps) {
  const [listings, setListings] = useState<Listing[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getListings().then(setListings).catch(console.error)
  }, [])

  const handleCreated = (newListing: Listing) => {
    setListings((prev) => [...prev, newListing])
    setIsModalOpen(false)
  }

  const context: AppOutletContext = {
    listings,
    onOpenModal: () => setIsModalOpen(true),
  }

  return (
    <div className="app-frame">
      <Header theme={theme} onToggleTheme={onToggleTheme} onOpenModal={() => setIsModalOpen(true)}/>
      <main className="page-content">
        <Outlet context={context} />
      </main>
      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleCreated}
      />

    </div>
  )
}
