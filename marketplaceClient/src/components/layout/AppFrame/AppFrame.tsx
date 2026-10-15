import { Outlet } from 'react-router'
import { Header } from '../Header/Header'
import { useEffect, useState } from "react"
import { ListingModal } from "../../ui/ListingModal/ListingModal"
import { getListings } from "../../../services/listing.service"
import type { Listing } from "../../../types/listing"
import type { Theme } from '../../../types/theme'
import { useListings } from '../../../context/ListingContext'
import './AppFrame.css'

interface AppFrameProps {
  theme: Theme
  onToggleTheme: () => void
}


export function AppFrame({ theme, onToggleTheme }: AppFrameProps) {
  const {addListing} = useListings()
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <main className="page-content">
        <Outlet context={{ onOpenModal: () => setIsModalOpen(true) }} />
      </main>
      <ListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={(listing) => {
          addListing(listing)
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
