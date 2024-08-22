import React from 'react'
import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Bus, Heart, Search, LucideProps } from 'lucide-react'
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

type BusLinesJson = typeof buslinesJson

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
  [key in keyof BusLinesJson]: BusLine
}

const buslines = buslinesJson as BusLineList

function HeaderButton({
  icon: Icon,
  children,
  active,
}: {
  icon: React.FC<LucideProps>
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <Button className='px-3 sm:px-4' variant={active ? 'default' : 'outline'}>
      <Icon className='h-5 w-5' />
      <span className='ml-2 hidden sm:inline'>{children}</span>
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
        <HeaderButton icon={Search} active={true}>
          Sve Linije
        </HeaderButton>
        <HeaderButton icon={Heart} active={false}>
          Sačuvane
        </HeaderButton>
      </nav>
    </header>
  )
}

function BusChart({ buslineName }: { buslineName: keyof BusLineList }) {
  return (
    <Card className='flex-auto p-5'>
      <CardHeader>
        <CardTitle className='mx-auto text-2xl text-primary'>
          {buslineName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='radni dan' className='flex flex-col items-center'>
          <TabsList>
            <TabsTrigger value='radni dan' className='text-base'>
              Radni Dan
            </TabsTrigger>
            <TabsTrigger value='subota' className='text-base'>
              Subota
            </TabsTrigger>
            <TabsTrigger value='nedelja' className='text-base'>
              Nedelja
            </TabsTrigger>
          </TabsList>
          {Object.entries(buslines[buslineName]).map(([day, busline]) => (
            <TabsContent key={day} value={day} className='w-full'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-16 text-base'>Hours</TableHead>
                    <TableHead className='text-base'>Minutes</TableHead>
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

function Main() {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <Header />
      <main
        className='container mx-auto flex w-full max-w-screen-lg flex-col
          items-stretch gap-4 p-4'
      >
        <BusChart buslineName='НИШКА БАЊА -> МИНОВО НАСЕЉЕ' />
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Main />
    </ThemeProvider>
  )
}

export default App
