type Range = {
  low: number,
  high: number
}

export type BoardingPassAttributes = {
  rowStartingRange: Range
  coulmnStartingRange: Range
  row: number
  coulmn: number
  seatId: number
}

export default class BoardingPass implements BoardingPassAttributes {
  rowStartingRange: Range
  coulmnStartingRange: Range
  row: number
  coulmn: number
  seatId: number

  constructor(rcStr: string) {
    const match = rcStr.match(/^([FB]{7})([LR]{3})$/)

    this.rowStartingRange = { low: 0, high: 127 }
    this.coulmnStartingRange = { low: 0, high: 7 }

    this.getRow(this.rowStartingRange, match[1])
    this.getCoulmn(this.coulmnStartingRange, match[2])

    this.seatId = (this.row * 8) + this.coulmn
  }

  getRow(rowRange: Range, rowStr: string) {
    const half = Math.trunc((rowRange.high - rowRange.low) / 2 + rowRange.low)
    const halfNeeded = rowStr.charAt(0)

    const newRange: Range = { low: 0, high: 0 }

    if (rowStr.length === 1) {
      if (halfNeeded === 'F') {
        this.row = rowRange.low
      } else if (halfNeeded === 'B') {
        this.row = rowRange.high
      } else {
        throw new Error('Failed to get row.')
      }
      return
    }

    if (halfNeeded === 'F') {
      newRange.low = rowRange.low
      newRange.high = half
    } else if (halfNeeded === 'B') {
      newRange.low = half + 1
      newRange.high = rowRange.high
    } else {
      throw new Error('Failed to get row.')
    }

    const newRowStr = rowStr.slice(1, rowStr.length)
    this.getRow(newRange, newRowStr)
  }

  getCoulmn(coulmnRange: Range, coulmnStr: string) {
    const half = Math.trunc((coulmnRange.high - coulmnRange.low) / 2 + coulmnRange.low)
    const halfNeeded = coulmnStr.charAt(0)

    const newRange: Range = { low: 0, high: 0 }

    if (coulmnStr.length === 1) {
      if (halfNeeded === 'L') {
        this.coulmn = coulmnRange.low
      } else if (halfNeeded === 'R') {
        this.coulmn = coulmnRange.high
      } else {
        throw new Error('Failed to get coulmn.')
      }
      return
    }

    if (halfNeeded === 'L') {
      newRange.low = coulmnRange.low
      newRange.high = half
    } else if (halfNeeded === 'R') {
      newRange.low = half + 1
      newRange.high = coulmnRange.high
    } else {
      throw new Error('Failed to get coulmn.')
    }

    const newRowStr = coulmnStr.slice(1, coulmnStr.length)
    this.getCoulmn(newRange, newRowStr)
  }
}