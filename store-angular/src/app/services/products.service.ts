import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products! : Product[];
  constructor() {
    this.products = [
      {id: 1, name: "iphone", price: 10000, quantity: 10},
      {id: 2, name: "samsung", price: 11000, quantity: 12},
      {id: 3, name: "oneplus", price: 7000, quantity: 6},
    ];
  }

  public getAllProducts() : Observable<Product[]>{
    return of([...this.products]);
  }

  public deleteProduct(id : number) : Observable<boolean>{
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public searchProducts (keyword : string) : Observable<Product[]>{
    return of(this.products.filter(p => p.name.includes(keyword)));
  }
}
