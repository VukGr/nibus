import buslinesJson from '@/assets/bus.json'

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

export { buslines }
export type { BusTimes, BusLine, BusLineList }
