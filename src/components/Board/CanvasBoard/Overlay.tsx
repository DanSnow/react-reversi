import { Text } from 'react-konva'

export function Overlay({ children }: { children: string }) {
  return <Text x={120} y={200} align="center" verticalAlign="center" fontSize={128} fill="red" text={children} />
}
