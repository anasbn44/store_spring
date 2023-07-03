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
