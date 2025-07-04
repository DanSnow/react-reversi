// app/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { env } from './env'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    basepath: env.VITE_BASE_URL,
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
