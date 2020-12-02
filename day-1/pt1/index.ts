import { readFileSync } from 'fs'

const processInput = (): number[] => {
    const data = readFileSync('./input.txt', 'utf8');
    const lines = data.split(/\r?\n/);
    return lines.map((line) => parseInt(line.trim()))
}

const mapInput = (input: Array<number>): {} => {
    const mappedInput = {};
    input.forEach(element => {
        const complement = 2020 - element
        mappedInput[element] = complement
    });

    return mappedInput
}

const getAnswer = (mappedInput: {}): number => {
    for (const key in mappedInput) {
        const complement = mappedInput[key]
        if(mappedInput[complement]){
            return parseInt(key) * complement
        }
      }
}

const input = processInput()
const mappedInput = mapInput(input)
const answer = getAnswer(mappedInput)

console.log(answer)