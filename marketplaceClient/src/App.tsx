import { Route, Routes } from 'react-router'
import { AppFrame } from './components/layout/AppFrame/AppFrame'
import { HomePage } from './pages/HomePage/HomePage'
import { ListingPage } from './pages/ListingPage/ListingPage'
import { AboutPage } from './pages/AboutPage/AboutPage'
import { ContactPage } from './pages/ContactPage/ContactPage'
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
    <Routes>
      <Route element={<AppFrame theme={theme} onToggleTheme={toggleTheme} />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
