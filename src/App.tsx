import React from 'react'
import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Heart, Bus, Search } from 'lucide-react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Header, HeaderButton, HeaderLogo } from '@/components/header'
import { BusChartPage } from '@/components/bus_chart'
import { BusLineSelect } from '@/components/bus_line_select'
import { buslines } from './services/bus_service'

function Layout() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Header>
        <HeaderLogo icon={Bus} text='NiBus' />
        <HeaderButton url='/' icon={Search}>
          Све Линије
        </HeaderButton>
        <HeaderButton url='/favorite' icon={Heart}>
          Сачуване
        </HeaderButton>
      </Header>
      <main
        className='container mx-auto flex w-full max-w-screen-lg flex-col
          items-stretch gap-4 p-4'
      >
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BusLineSelect buslines={buslines} />,
      },
      {
        path: '/line/:id',
        element: <BusChartPage />,
      },
      {
        path: '/favorite',
        element: <BusLineSelect buslines={buslines} />,
      },
    ],
  },
])

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
