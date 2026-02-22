import { lazy } from 'react'

export const SettingModal = lazy(() =>
  import('./SmartSettingModal').then((module) => ({ default: module.SmartSettingModal })),
)
