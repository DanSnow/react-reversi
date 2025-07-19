import process from 'node:process'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

function getEnv(key: string) {
  try {
    return process.env[key]
  } catch {
    return undefined
  }
}

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
    DEPLOY: getEnv('DEPLOY'),
    ANALYZE: getEnv('ANALYZE'),
    VITE_BASE_URL: getEnv('VITE_BASE_URL') ?? import.meta.env?.VITE_BASE_URL,
  },
})
