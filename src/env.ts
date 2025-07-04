import process from 'node:process'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod/v4'

export const env = createEnv({
  server: {
    DEPLOY: z.stringbool().default(false),
    ANALYZE: z.stringbool().default(false),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_BASE_URL: z.string().default('/'),
  },
  runtimeEnvStrict: {
    DEPLOY: process.env?.DEPLOY,
    ANALYZE: process.env?.ANALYZE,
    VITE_BASE_URL: process.env?.VITE_BASE_URL ?? import.meta.env?.VITE_BASE_URL,
  },
})
