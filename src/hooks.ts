import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector
export const useDispatch = (): AppDispatch => _useDispatch<AppDispatch>()
