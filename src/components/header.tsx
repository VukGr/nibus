import { LucideProps } from 'lucide-react'
import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function HeaderButton({
  icon: Icon,
  url,
  children,
}: {
  icon: React.FC<LucideProps>
  url: string
  children: React.ReactNode
}) {
  const active = useMatch(url)
  return (
    <Button
      className='px-3 sm:px-4'
      variant={active ? 'default' : 'ghost'}
      asChild
    >
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? 'bg-primary' : 'bg-background'
        }
      >
        <Icon className='h-5 w-5' />
        <span className='ml-2 hidden sm:inline'>{children}</span>
      </NavLink>
    </Button>
  )
}

function HeaderLogo({
  icon: Icon,
  text,
}: {
  icon: React.FC<LucideProps>
  text: string
}) {
  return (
    <div className='mr-4 flex items-center gap-2 text-lg font-semibold
      text-primary'>
      <Icon className='h-8 w-8' />
      <span>{text}</span>
    </div>
  )
}

function Header({ children }: { children: React.ReactNodeArray }) {
  return (
    <header
      className='sticky top-0 z-50 flex h-16 items-center gap-4 border-b
        bg-background px-4 md:px-6'
    >
      <nav className='flex flex-row items-center gap-4'>{children}</nav>
    </header>
  )
}

export { Header, HeaderButton, HeaderLogo }
