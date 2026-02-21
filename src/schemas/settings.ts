import { z } from 'zod'

export const SettingSchema = z.object({
  hint: z.boolean(),
  retract: z.boolean(),
  version: z.string(),
  renderer: z.string(),
})

export type Setting = z.infer<typeof SettingSchema>
