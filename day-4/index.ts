import { readFileSync } from 'fs'
import Passport, { PassportAttributes } from '../utilities/passport'

const processInput = (): Array<string> => {
    const data = readFileSync('./day-4/input.txt', 'utf8');
    const lines = data.trim().split(/\n\s*\n/);

    return lines
}

export const partOne = (): void => {
    const passportsText = processInput()


    let passports: Passport[] = []
    let validPassports = 0

    for (let index = 0; index < passportsText.length; index++) {
        const passport = new Passport(passportsText[index])

        passports.push(passport)

        if (passports[index].isValid({ cid: true })) {
            validPassports++
        }
    }

    console.log(validPassports)
}

export const partTwo = (): void => {
    const passportsText = processInput()


    let passports: Passport[] = []
    let validPassports = 0

    for (let index = 0; index < passportsText.length; index++) {
        const passport = new Passport(passportsText[index])

        passports.push(passport)

        if (passports[index].isValid2({ cid: true })) {
            validPassports++
        }
    }

    console.log(validPassports)
}

