import {ProductsService} from "../services/products.service";

export interface Product {
  id : string,
  name : string,
  price : number,
  quantity : number,
}
export interface PageProduct{
  products : Product[],
  page : number,
  size : number,
  totalPages : number,
}

export interface PageProductRest{
  _embedded : ProductList,
  page : Page,
}
export interface ProductList{
  products : Product[]
}
export interface Page{
  size : number,
  totalElements : number,
  totalPages : number,
  number : number,
}
