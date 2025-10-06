// app/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { env } from './env'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    basepath: env.VITE_BASE_URL,
    routeTree,
    scrollRestoration: true,
  })

  return router
}
