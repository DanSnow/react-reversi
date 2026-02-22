import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { getLocale, locales, setLocale } from '~/paraglide/runtime'

export function LocaleSwitcher() {
  return (
    <Select value={getLocale()} onValueChange={(value) => setLocale(value ?? 'en')}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
