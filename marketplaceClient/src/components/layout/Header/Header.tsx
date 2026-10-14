import { Heart, Plus, Sun } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Button } from '../../ui/Button/Button'
import type { Theme } from '../../../types/theme'
import './Header.css'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
  onOpenModal: () => void
}

export function Header({ theme, onToggleTheme, onOpenModal }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">Campus Marketplace</Link>
      </div>

      <nav className="header-middle" aria-label="Main navigation">
        <NavLink className="header-nav-link" to="/listings">Browse</NavLink>
        <NavLink className="header-nav-link" to="/about">About</NavLink>
        <NavLink className="header-nav-link" to="/contact">Contact</NavLink>
      </nav>

      <div className="header-right">
        <Button icon={Plus} size="small" onClick={onOpenModal}>Sell an Item</Button>        <Button variant="secondary" icon={Heart} size="small" aria-label="Saved listings" />
        <Button
          variant="secondary"
          icon={Sun}
          size="small"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        />
      </div>
    </header>
  )
}
