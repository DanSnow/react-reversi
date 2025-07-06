import type { ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import { useEffectOnce } from 'react-use'
import MoonIcon from '~icons/lucide/moon'
import SunIcon from '~icons/lucide/sun'
import { cn } from '~/lib/utils'

type TTheme = 'light' | 'dark'

function ThemeSwitcherButton({
  selectedTheme,
  value,
  setTheme,
  children,
}: {
  selectedTheme: TTheme
  value: TTheme
  setTheme: (theme: TTheme) => void
  children: ReactNode
}) {
  return (
    <div className="-mt-px first:-ml-px last:-mr-px">
      <input
        aria-label={value}
        id={`theme-switch-${value}`}
        type="radio"
        value={value}
        checked={selectedTheme === value}
        onClick={() => setTheme(value)}
        onChange={() => setTheme(value)}
        className="absolute m-0 appearance-none p-0"
      />
      <label
        htmlFor={`theme-switch-${value}`}
        className={cn(
          'group flex size-8 cursor-pointer items-center justify-center rounded-full',
          selectedTheme === value && 'border-shadow border',
        )}
      >
        <span className="sr-only">{value}</span>
        {children}
      </label>
    </div>
  )
}

export const ThemeSwitcher = () => {
  const { systemTheme = 'light', setTheme: setAppTheme, theme: appTheme, resolvedTheme = appTheme } = useTheme()
  const getInitialTheme = (): TTheme => {
    if (typeof window === 'undefined') {
      return 'light'
    }
    return (localStorage.getItem('theme') as TTheme) || systemTheme
  }

  const [theme, setThemeState] = useState<TTheme>(getInitialTheme)

  const setTheme = useCallback(
    (theme: TTheme) => {
      setThemeState(theme)
      setAppTheme(theme)
    },
    [setAppTheme],
  )

  useEffectOnce(() => {
    if (resolvedTheme && theme !== resolvedTheme) {
      setTheme(resolvedTheme as TTheme)
    }
  })

  return (
    <fieldset className="border-shadow m-0 flex h-8 rounded-full border p-0">
      <legend className="sr-only">Select a display theme:</legend>
      <ThemeSwitcherButton value="light" selectedTheme={theme} setTheme={setTheme}>
        <SunIcon />
      </ThemeSwitcherButton>
      <ThemeSwitcherButton value="dark" selectedTheme={theme} setTheme={setTheme}>
        <MoonIcon />
      </ThemeSwitcherButton>
    </fieldset>
  )
}
