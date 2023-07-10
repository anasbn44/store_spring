import { Injectable } from '@angular/core';
import {PageProduct, PageProductRest, Product} from "../models/product";
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
  }

  public getAllProducts() : Observable<Product[]>{
    return of([...this.products]);
  }

  public getAllProductsSpring(page : number, size : number) : Observable<PageProductRest>{
    return this.http.get<PageProductRest>(`http://localhost:1999/INVENTORY-SERVICE/products?page=${page}&size=${size}`);
  }

  public getPageProducts(page : number, size : number) : Observable<PageProduct>{
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size != 0) totalPages++;
    let pageProduct  = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProduct})
  }

  public deleteProduct(id : string) : Observable<any>{
    // this.products = this.products.filter(p => p.id != id);
    // return of(true);
    return this.http.delete<any>(`http://localhost:1999/INVENTORY-SERVICE/products/${id}`)
  }

  public searchProducts (keyword : string, page : number, size : number) : Observable<PageProductRest>{
    // let result = this.products.filter(p => p.name.includes(keyword));
    // let index = page * size;
    // let totalPages = ~~(result.length / size);
    // if(result.length % size != 0)
    //   totalPages++;
    // let pageProduct  = result.slice(index, index + size);
    //
    // return of({page: page, size: size, totalPages: totalPages, products: pageProduct});
    return this.http.get<PageProductRest>(`http://localhost:1999/INVENTORY-SERVICE/products/search/byName?keyword=${keyword}&page=${page}&size=${size}`);
  }


  public addProduct(product : Product) : Observable<Product>{
    // product.id = UUID.UUID();
    // this.products.push(product);
    // return of(product);
    return this.http.post<Product>(`http://localhost:1999/INVENTORY-SERVICE/products`, product);
  }

  public getProduct(id : string) : Observable<Product>{
    // let find = this.products.find(p => p.id == id);
    // if (find == undefined) return throwError(()=> new Error("product not found"));
    // return of(find);
    return this.http.get<Product>(`http://localhost:1999/INVENTORY-SERVICE/products/${id}`);
  }

  public updateProduct(product : Product) : Observable<Product>{
    // this.products = this.products.map(p => (p.id == product.id)? product : p);
    // return of(product);
    return this.http.put<Product>(`http://localhost:1999/INVENTORY-SERVICE/products/${product.id}`, product);
  }
}
