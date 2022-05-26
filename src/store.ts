import { atom } from 'nanostores'
import type { Span } from './types'

export const selectedSpan = atom<Span | null>(null)
