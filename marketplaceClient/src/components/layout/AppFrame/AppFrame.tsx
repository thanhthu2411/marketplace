import { Outlet } from 'react-router'
import { Header } from '../Header/Header'
import type { Theme } from '../../../types/theme'
import './AppFrame.css'

type AppFrameProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function AppFrame({ theme, onToggleTheme }: AppFrameProps) {
  return (
    <div className="app-frame">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <Outlet />
    </div>
  )
}
