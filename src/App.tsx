import React from 'react'
import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Bus, Heart, Search, LucideProps, ChevronLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import buslinesJson from '@/assets/bus.json'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { Button } from './components/ui/button'
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom'

type BusTimes = {
  timechart: { [key: string]: string }
  notes: string[]
}

type BusLine = {
  'radni dan': BusTimes
  subota: BusTimes
  nedelja: BusTimes
}

type BusLineList = {
  [key: string]: BusLine
}

const buslines = buslinesJson as BusLineList

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

function Header() {
  return (
    <header
      className='sticky top-0 z-50 flex h-16 items-center gap-4 border-b
        bg-background px-4 md:px-6'
    >
      <nav className='flex flex-row items-center gap-4'>
        <div
          className='mr-4 flex items-center gap-2 text-lg font-semibold
            text-primary'
        >
          <Bus className='h-8 w-8' />
          <span>NiBus</span>
        </div>
        <HeaderButton url='/' icon={Search}>
          Све Линије
        </HeaderButton>
        <HeaderButton url='/favorite' icon={Heart}>
          Сачуване
        </HeaderButton>
      </nav>
    </header>
  )
}

function BusLineSelectButton({ line }: { line: string }) {
  const [source, destination] = line.split(' -> ')
  return (
    <Button
      size='sm'
      className='line-clamp-1 flex h-14 flex-col text-xs/4 font-semibold'
      asChild
    >
      <Link to={`/line/${line}`}>
        <span>{source}</span>
        <span className='-my-1.5 text-base'>↓</span>
        <span>{destination}</span>
      </Link>
    </Button>
  )
}

function BusLineSelect({ buslines }: { buslines: BusLineList }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='mx-auto text-2xl text-primary'>
          Све Линије
        </CardTitle>
      </CardHeader>
      <CardContent className='grid grid-flow-row grid-cols-2 gap-4'>
        {Object.keys(buslines).map((line) => (
          <BusLineSelectButton key={line} line={line} />
        ))}
      </CardContent>
    </Card>
  )
}

function BusChart({ buslineName }: { buslineName: string }) {
  const [source, destination] = buslineName.split(' -> ')
  const navigate = useNavigate()
  return (
    <Card className='flex-auto p-5'>
      <CardHeader className='flex flex-row items-start justify-between p-0 pb-6'>
        <Button size='icon' className='' onClick={() => navigate(-1)}>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <CardTitle className='flex flex-col items-center text-2xl text-primary'>
          <span>{source}</span>
          <span className='-my-1.5'>↓</span>
          <span>{destination}</span>
        </CardTitle>
        <Button size='icon' className=''>
          <Heart className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='radni dan' className='flex flex-col items-center'>
          <TabsList>
            <TabsTrigger value='radni dan' className='text-base'>
              Радни Дан
            </TabsTrigger>
            <TabsTrigger value='subota' className='text-base'>
              Субота
            </TabsTrigger>
            <TabsTrigger value='nedelja' className='text-base'>
              Недеља
            </TabsTrigger>
          </TabsList>
          {Object.entries(buslines[buslineName]).map(([day, busline]) => (
            <TabsContent key={day} value={day} className='w-full'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-16 text-base'>час</TableHead>
                    <TableHead className='text-base'>минути</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(busline.timechart).map(([hour, minutes]) => (
                    <TableRow key={hour}>
                      <TableCell className='text-base'>{hour}</TableCell>
                      <TableCell className='text-base'>{minutes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex flex-col py-2'>
                {busline.notes.map((note) =>
                  note.split('\n').map((line) => <p key={line}>{line}</p>)
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function BusChartRoute() {
  const { id } = useParams()
  if (id) {
    return <BusChart buslineName={id} />
  } else {
    // TODO Make 404 page
    return <div>404</div>
  }
}

function Layout() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Header />
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
        element: <BusChartRoute />,
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
