import { Route, Routes } from 'react-router'
import { AppFrame } from './components/layout/AppFrame/AppFrame'
import { HomePage } from './pages/HomePage/HomePage'
import { AllListingsPage } from './pages/AllListingsPage/AllListingsPage'
import { AboutPage } from './pages/AboutPage/AboutPage'
import { ContactPage } from './pages/ContactPage/ContactPage'
import { ListingDetailPage } from './pages/ListingDetailPage/ListingDetailPage'
import { ListingProvider } from './context/ListingContext'
import { useEffect, useState } from 'react'
import type { Theme } from './types/theme'

function getInitialTheme(): Theme {
  return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ListingProvider>
      <Routes>
      <Route element={<AppFrame theme={theme} onToggleTheme={toggleTheme} />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<AllListingsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="listings/:id" element={<ListingDetailPage />} />
      </Route>
    </Routes>
    </ListingProvider>
    
  )
}

export default App
