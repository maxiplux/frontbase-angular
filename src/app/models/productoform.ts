import { Product} from "./product";

 interface Select {
  value: string;
  text: string;
}

export default class Productform {
  id: number
  name: string
  industry: Select[]
  sector: Select[]
  website: string
  rank: string

  constructor(product:Product) {
    this.industry=[{value: product.industry.name, text: product.industry.name}];
    this.sector=[{value: product.sector.name, text: product.sector.name}];
    this.id=product.id;
    this.name=product.name;
    this.website=product.website;
    this.rank=product.rank;

  }
  // @ts-ignore




}
