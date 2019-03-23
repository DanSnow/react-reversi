declare const __DEV__: boolean
declare const VERSION: string

interface Enhancer<T> {
  (x: T): T
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: <T>() => Enhancer<T>
}
