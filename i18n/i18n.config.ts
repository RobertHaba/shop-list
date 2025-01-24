import pl from './locales/pl.json'

import { pluralRules } from './rules/pluralization'

export default defineI18nConfig(() => ({
  legacy: false,
  lazy: true,
  pluralRules,
}))
