import { Injectable } from '@angular/core';
import {PageProduct, Product} from "../models/product";
import {Observable, of, throwError} from "rxjs";
import {UUID} from "angular2-uuid";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products! : Product[];
  productSpring! : Product[];
  constructor(private http : HttpClient) {
    this.products = [];
    for (let i = 0; i < 10; i++) {
      this.products.push({id: UUID.UUID(), name: "iphone", price: 10000, quantity: 10});
      this.products.push({id: UUID.UUID(), name: "samsung", price: 11000, quantity: 12});
      this.products.push({id: UUID.UUID(), name: "oneplus", price: 7000, quantity: 6});
    }
    let http1 = this.http.get<Product[]>("http://localhost:1999/INVENTORY-SERVICE/products");
  }

  public getAllProducts() : Observable<Product[]>{
    return of([...this.products]);
  }

  public getAllProductsSpring(page : number, size : number) : Observable<PageProduct>{

    let index = page * size;
    let totalPages = ~~(this.productSpring.length / size);
    if(this.productSpring.length % size != 0) totalPages++;
    let pageProduct  = this.productSpring.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProduct})
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


  public addProduct(product : Product) : Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProduct(id : string) : Observable<Product>{
    let find = this.products.find(p => p.id == id);
    if (find == undefined) return throwError(()=> new Error("product not found"));
    return of(find);
  }

  public updateProduct(product : Product) : Observable<Product>{
    this.products = this.products.map(p => (p.id == product.id)? product : p);
    return of(product);
  }
}
