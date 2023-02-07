export interface  Generic {
  name: string
}
export interface  Industry extends Generic{
}

export interface  Sector extends Generic{
}

export interface GenericCollection<T> {
  _embedded: T
  page: Page
}

export interface IndustryCollection {
  industries: Industry[]
}
export interface SectorCollection {
  sectors: Sector[]
}

export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}
