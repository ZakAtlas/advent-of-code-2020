import { readFileSync } from 'fs'
import BoardingPass from '../utilities/boardingPass'

const processInput = (): Array<string> => {
  const data = readFileSync('./day-5/input.txt', 'utf8');
  const lines = data.split(/\r?\n/);

  return lines
}

export const partOne = (): void => {
  const boardingPassesLines = processInput()

  let highestId = 0

  boardingPassesLines.forEach(passStr => {
    const boardingPass = new BoardingPass(passStr)
    if (boardingPass.seatId > highestId) {
      highestId = boardingPass.seatId
    }
  });

  console.log(highestId)
}

export const partTwo = (): void => {
  const boardingPassesLines = processInput()

  const boardingPassIds: number[] = []

  boardingPassesLines.forEach(passStr => {
    const boardingPass = new BoardingPass(passStr)
    boardingPassIds.push(boardingPass.seatId)
  });

  boardingPassIds.sort(function (a, b) { return a - b });

  let mySeatId = -99

  for (let index = 0; index < boardingPassIds.length; index++) {
    if (boardingPassIds[index] + 1 !== boardingPassIds[index + 1] && index + 1 !== boardingPassIds.length) {
      mySeatId = boardingPassIds[index] + 1
    }
  }

  console.log(mySeatId)
}

