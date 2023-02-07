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
