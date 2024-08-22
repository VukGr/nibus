import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BusLineList } from '@/services/bus_service'
import { Link } from 'react-router-dom'

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

// TODO Split into page and button list component.
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

export { BusLineSelect, BusLineSelectButton }
