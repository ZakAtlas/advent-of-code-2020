export type BagAttributes = {
  bagName: string
  bagRules: { [key: string]: number }
}

export default class Bag implements BagAttributes {
  static s
  bagName
  bagRules = {}

  constructor(bag: string) {
    let match = bag.match(/(\w* \w*) bags contain (\d+ [\w ]+.+)/)

    if (match) {
      this.bagName = match[1]

      let a = match[2].replace(/bags|bag|\./g, ' ')
      const rules = a.split(',')

      rules.forEach(rule => {
        rule = rule.trim()
        const amount = rule.charAt(0)
        rule = rule.substr(2, rule.length)

        this.bagRules[rule] = parseInt(amount)
      });
    }
    else {
      match = bag.match(/^([\w| ]+) bags contain no other bags\.?/)

      if (!match) {
        throw new Error(`Failed to make bag: ${match}`)
      }

      this.bagName = match[1]
    }
  }

}