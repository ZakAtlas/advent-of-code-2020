import CharStringHelper from './char'

export type PassportAttributes = {
        byr?: string | boolean
        iyr?: string | boolean
        eyr?: string | boolean
        hgt?: string | boolean
        hcl?: string | boolean
        ecl?: string | boolean
        pid?: string | boolean
        cid?: string | boolean
}

export default class Passport implements PassportAttributes {
        byr: string
        iyr: string
        eyr: string
        hgt: string
        hcl: string
        ecl: string
        pid: string
        cid: string

        constructor(passport: string) {
                const lines = passport.trim().split(/\s+/);

                lines.forEach(property => {
                        let prop = []
                        prop = property.split(":")

                        this[prop[0]] = prop[1]
                });
        }

        isValid = (exclude?: PassportAttributes): boolean => {
                if (!this.byr && !exclude.byr) {
                        return false
                } else if (!this.iyr && !exclude.iyr) {
                        return false
                } else if (!this.eyr && !exclude.eyr) {
                        return false
                } else if (!this.hgt && !exclude.hgt) {
                        return false
                } else if (!this.hcl && !exclude.hcl) {
                        return false
                } else if (!this.ecl && !exclude.ecl) {
                        return false
                } else if (!this.pid && !exclude.pid) {
                        return false
                } else if (!this.cid && !exclude.cid) {
                        return false
                } else {
                        return true
                }
        }

        isValid2 = (exclude?: PassportAttributes): boolean => {
                if (parseInt(this.byr) < 1920 || parseInt(this.byr) > 2002 || !this.byr) {
                        return false
                }

                if (parseInt(this.iyr) < 2010 || parseInt(this.iyr) > 2020 || !this.iyr) {
                        return false
                }

                if (parseInt(this.eyr) < 2020 || parseInt(this.eyr) > 2030 || !this.eyr) {
                        return false
                }

                if (!this.validateHeight()) {
                        return false
                }

                if (!this.validateHairColor()) {
                        return false
                }

                if (!this.validateEyeColor()) {
                        return false
                }


                if (!this.validatePassportId()) {
                        return false
                }

                if (!this.cid && !exclude.cid) {
                        return false
                }

                return true
        }

        validateHeight = (): boolean => {
                if (!this.hgt) return false

                const match = this.hgt.match(/^(\d+)([a-z]+)$/)

                if (!match) return false

                const typeMatch = match[2]
                const numMatch = parseInt(match[1])

                if (typeMatch === 'cm') {
                        if (numMatch >= 150 && numMatch <= 193)
                                return true
                } else if (typeMatch === 'in') {
                        if (numMatch >= 59 && numMatch <= 76)
                                return true
                } else {
                        return false
                }
        }

        validateHairColor = (): boolean => {
                if (!this.hcl) return false

                const match = this.hcl.match(/^#((\d)|[a-f]){6}$/)

                if (!match) return false

                return true
        }

        validateEyeColor = (): boolean => {
                if (!this.ecl) return false

                const match = this.ecl.match(/^((amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)){1}$/)

                if (!match) return false

                return true
        }

        validatePassportId = (): boolean => {
                if (!this.pid) return false

                const match = this.pid.match(/^(\d{9})$/)

                if (!match) return false

                return true
        }
}