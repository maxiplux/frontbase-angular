export interface Products {
  _embedded: Embedded
  _links: Links2
  page: Page
}

export interface Embedded {
  products: Product[]
}

export interface Product {
  id: number
  name: string
  industry: string
  sector: string
  website: string
  rank: string
  _links: Links
}

export interface Links {
  self: Self
  product: Product2
}

export interface Self {
  href: string
}

export interface Product2 {
  href: string
}

export interface Links2 {
  first: First
  prev: Prev
  self: Self2
  next: Next
  last: Last
  profile: Profile
}

export interface First {
  href: string
}

export interface Prev {
  href: string
}

export interface Self2 {
  href: string
}

export interface Next {
  href: string
}

export interface Last {
  href: string
}

export interface Profile {
  href: string
}

export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}
