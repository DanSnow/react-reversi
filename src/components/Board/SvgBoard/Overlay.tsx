import { twc } from 'react-twc'

export const Overlay = twc.text.attrs({
  style: { textAnchor: 'middle' },
  x: '50%',
  y: '50%',
})`text-9xl pointer-events-none fill-red-600`
