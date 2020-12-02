import { readFileSync } from 'fs'

const processInput = (): number[] => {
    const data = readFileSync('../input.txt', 'utf8');
    const lines = data.split(/\r?\n/);
    return lines.map((line) => parseInt(line.trim()))
}

const mapInput = (input: Array<number>): {} => {
    const mappedInput = {};

    for (let index1 = 0; index1 < input.length; index1++) {
        const pairs : Array<Array<number>>= []
        for (let index2 = 0; index2 < input.length; index2++) {
            const complements = [input[index2], 2020 - (input[index1] + input[index2])]
            if (complements[1] > 0){
            pairs.push(complements)
        }
        }
        mappedInput[input[index1]] = pairs 
    }

    return mappedInput
}

const getAnswer = (mappedInput: {}): number => {
    for (const key in mappedInput) {
        for (let index = 0; index < mappedInput[key].length; index++) {
            const complement = mappedInput[key][index][1]
            if(mappedInput[complement]){
                return parseInt(key) * mappedInput[key][index][0] * mappedInput[key][index][1]
            }
        }
      }
      return 0
}

const input = processInput()
const mappedInput = mapInput(input)
const answer = getAnswer(mappedInput)

console.log(answer)