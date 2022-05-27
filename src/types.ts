export interface Span {
  start: number
  end: number
}

export interface Error {
  message: string
  span: Span
}
