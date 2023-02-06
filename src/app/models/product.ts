import {Industry, Sector} from "./generics";

export interface Page {
  size: number
  totalElements: number
  totalPages: number


  number: number

  first: boolean
  numberOfElements: number
  empty: boolean
  last: boolean

}
export interface Products extends Page {
  content: Product[]

  pageable: pageable

}





export interface Product {
  id: number
  name: string
  industry: Industry
  sector: Sector
  website: string
  rank: string

}

export interface Links {
  self: Self
  product: Self
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

export interface  Sort {
  empty:boolean
  sorted:boolean

  unsorted:boolean

  unpaged:boolean

}

export interface pageable
{
  offset: number


  pageNumber: number


  pageSize: number


  paged: boolean


  sort:Sort


  unpaged: boolean


}
