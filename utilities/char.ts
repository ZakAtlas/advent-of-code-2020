export default class CharStringHelper {
    string: string
    currentChar: any
    nextChar: any
    currentCharPos = 0
    nextCharPos = 1

    constructor(str: string) {
        this.string = str
        this.currentChar = str.charAt(this.currentCharPos)
        this.nextChar = str.charAt(this.nextCharPos)
    }

    next(): void {
        this.currentCharPos++
        this.nextCharPos++

        this.currentChar = this.string.charAt(this.currentCharPos)
        this.nextChar = this.string.charAt(this.nextCharPos)
    }
}