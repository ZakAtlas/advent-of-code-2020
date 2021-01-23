import { readFileSync } from 'fs'
import Bag, { BagAttributes } from '../utilities/luggage'

const processInput = (): Array<string> => {
  const data = readFileSync('./day-7/input.txt', 'utf8');
  const lines = data.split(/\r?\n/);

  return lines
}

export const partOne = (): void => {
  const inputLines = processInput()
  const bags: { [key: string]: Bag } = {}
  const bagsHoldGoldDirectly: { [key: string]: Bag } = {}
  const bagsVisited: { [key: string]: Bag } = {}
  const bagsTotal: Array<string> = []

  const traverse = (bag: Bag): void => {
    if (!bagsVisited[bag.bagName]) {
      bagsTotal.push(bag.bagName)
      bagsVisited[bag.bagName] = bag
    } else {
      return
    }

    for (const bagName in bag.bagRules) {
      if (!bagsVisited[bagName]) {
        traverse(bags[bagName])
      }
    }

  }

  inputLines.forEach(line => {
    const bag = new Bag(line)
    bags[bag.bagName] = bag
  });


  //Bags that can hold gold bag directly
  for (const bag in bags) {
    if (bags[bag].bagRules["shiny gold"]) {
      bagsHoldGoldDirectly[bags[bag].bagName] = bags[bag]
    }
  }

  for (const bagName in bagsHoldGoldDirectly) {
    traverse(bagsHoldGoldDirectly[bagName])
  }

  console.log(bagsHoldGoldDirectly, bagsTotal.sort(), bagsTotal.length)
}


export const partTwo = (): void => {

}

