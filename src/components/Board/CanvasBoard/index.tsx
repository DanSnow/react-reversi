import { lazy } from 'react'

export const CanvasBoard = {
  Root: lazy(() => import('./Board').then((module) => ({ default: module.Board }))),
  Background: lazy(() => import('./Background').then((module) => ({ default: module.Background }))),
  Chesses: lazy(() => import('./Chesses').then((module) => ({ default: module.Chesses }))),
  Overlay: lazy(() => import('./Overlay').then((module) => ({ default: module.Overlay }))),
  ChooseColor: lazy(() => import('./ChooseColor').then((module) => ({ default: module.ChooseColor }))),
}
