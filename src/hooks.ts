import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux'

import { AppDispatch, RootState } from './store'

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector
export const useDispatch = (): AppDispatch => _useDispatch<AppDispatch>()
