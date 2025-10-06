import { TanStackDevtools } from '@tanstack/react-devtools'

export function Devtools() {
  return (
    <TanStackDevtools
      plugins={[
        {
          name: 'Vite Inspect',
          render: <iframe src="/__inspect/" title="Vite Inspect" width="100%" height="100%" />,
        },
      ]}
    />
  )
}
