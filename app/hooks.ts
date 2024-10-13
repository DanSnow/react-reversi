import type { AppDispatch } from './store'

import { useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux'

export const useDispatch = (): AppDispatch => _useDispatch<AppDispatch>()
