export enum Action {
  add = 'ADD',
  edit = 'EDIT'
}
export enum Status {
  revise = 'Revised',
  original = 'Original'
}
export interface Pagegination {
  pageSize: number
  page: number
}

export interface Condition {
  field: string
  value: string
}
export interface ExcelType {
  a: string
  b: string
  c: string
  d: string
  e: string
  f: string
  g: string
  h: string
  i: string
  j: string
  k: string
  l: string
  m: string
  n: string
  o: string
  p: string
  q: string
  r: string
  s: string
}
export interface ExcelPowerType extends ExcelType {
  s: string
  t: string
  u: string
  v: string
  w: string
  x: string
  y: string
  z: string
  aa: string
}
