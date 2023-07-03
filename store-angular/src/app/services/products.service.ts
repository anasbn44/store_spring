import { Injectable } from '@angular/core';
import {PageProduct, Product} from "../models/product";
import {Observable, of} from "rxjs";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products! : Product[];
  constructor() {
    this.products = [];
    for (let i = 0; i < 10; i++) {
      this.products.push({id: UUID.UUID(), name: "iphone", price: 10000, quantity: 10});
      this.products.push({id: UUID.UUID(), name: "samsung", price: 11000, quantity: 12});
      this.products.push({id: UUID.UUID(), name: "oneplus", price: 7000, quantity: 6});
    }
  }

  public getAllProducts() : Observable<Product[]>{
    return of([...this.products]);
  }

  public getPageProducts(page : number, size : number) : Observable<PageProduct>{
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size != 0) totalPages++;
    let pageProduct  = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProduct})
  }

  public deleteProduct(id : string) : Observable<boolean>{
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public searchProducts (keyword : string, page : number, size : number) : Observable<PageProduct>{
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(result.length / size);
    if(result.length % size != 0)
      totalPages++;
    let pageProduct  = result.slice(index, index + size);

    return of({page: page, size: size, totalPages: totalPages, products: pageProduct});
  }
}
