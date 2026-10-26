import type { ButtonHTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'
import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

export function Button({
  children,
  icon: Icon,
  variant='primary',
  size = 'medium',
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} {...rest}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      {children && <span>{children}</span>}
    </button>
  )
}
