import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import MoonIcon from '~icons/lucide/moon'
import SunIcon from '~icons/lucide/sun'

type TTheme = 'light' | 'dark'

export const ThemeSwitcher = () => {
  const { systemTheme = 'light', setTheme: setAppTheme } = useTheme()
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

  return (
    <fieldset className="border-shadow m-0 flex h-8 rounded-[999999px] border p-0">
      <legend className="sr-only">Select a display theme:</legend>
      <div className="-mt-px -ml-px">
        <input
          aria-label="light"
          id="theme-switch-light"
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
          className="absolute m-0 appearance-none p-0"
        />
        <label
          htmlFor="theme-switch-light"
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[999999px] group${theme === 'light' ? 'border-shadow border' : ''}`}
        >
          <span className="sr-only">light</span>
          <SunIcon />
        </label>
      </div>
      <div className="-mt-px -mr-px">
        <input
          aria-label="dark"
          id="theme-switch-dark"
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
          className="absolute m-0 appearance-none p-0"
        />
        <label
          htmlFor="theme-switch-dark"
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[999999px] group${theme === 'dark' ? 'border-shadow border-l' : ''}`}
        >
          <span className="sr-only">dark</span>
          <MoonIcon />
        </label>
      </div>
    </fieldset>
  )
}
