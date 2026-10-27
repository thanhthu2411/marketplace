import { Outlet } from 'react-router'
import { Header } from '../Header/Header'
import { useState } from "react"
import { ListingModal } from "../../ui/ListingModal/ListingModal"
import type { Theme } from '../../../types/theme'
import type { Listing } from "../../../types/listing"

// import { useListings } from '../../../context/useListings'
import './AppFrame.css'

interface AppFrameProps {
  theme: Theme
  onToggleTheme: () => void
}

export type AppOutletContext = {
  onOpenModal: () => void
  onEditListing: (listing: Listing) => void
}



export function AppFrame({ theme, onToggleTheme }: AppFrameProps) {
  // const {addListing} = useListings()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)

  const openEdit = (listing: Listing) => {
    setEditingListing(listing)   // edit mode
    setIsModalOpen(true)
  }

  const openCreate = () => {
    setEditingListing(null)      // create mode
    setIsModalOpen(true)
  }

  const context: AppOutletContext = {
    onOpenModal: openCreate,
    onEditListing: openEdit,
  }

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenModal={openCreate}
      />
      <main className="page-content">
        <Outlet context={context} />
      </main>
      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={editingListing}
      />
    </>
  )
}
