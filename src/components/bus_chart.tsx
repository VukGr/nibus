import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Heart } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { buslines } from '@/services/bus_service'

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

// TODO Move to pages directory
function BusChartPage() {
  const { id } = useParams()
  if (id) {
    return <BusChart buslineName={id} />
  } else {
    // TODO Make 404 page
    return <div>404</div>
  }
}

export { BusChart, BusChartPage }
