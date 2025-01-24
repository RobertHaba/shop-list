export const pluralRules = {
  pl(choice: number) {
    const name = new Intl.PluralRules('pl-PL').select(choice)

    return { zero: 0, one: 1, two: 2, few: 2, many: 0, other: 3 }[name]
  },
}
