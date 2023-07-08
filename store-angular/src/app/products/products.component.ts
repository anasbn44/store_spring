import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Product[];
  currentPage : number = 0;
  pageSize : number = 5;
  totalPage : number = 0;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  action : string = "all";
  constructor(private productsService : ProductsService, private fb : FormBuilder,
              public authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null),
    })
    this.getPageProducts();
  }

  public getPageProducts() {
    this.productsService.getAllProductsSpring(this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.products = data.products;
        this.totalPage = data.totalPages;
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }
  public getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error : err => {
        this.errorMessage = err;
      }
    });
  }

  deleteProduct(p: Product) {
    let conf = confirm("Do you want to delete ?");
    if (conf == false) return;
    this.productsService.deleteProduct(p.id).subscribe({
      next : data => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      }
    })

  }

  searchProduct() {
    // this.currentPage = 0;
    this.action = "search";
    let key = this.searchFormGroup.value.keyword;
    this.productsService.searchProducts(key, this.currentPage, this.pageSize).subscribe({
      next : data => {
        this.products = data.products;
        this.totalPage = data.totalPages;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage = i;
    if(this.action === 'all')
      this.getPageProducts();
    else
      this.searchProduct();
  }

  newProduct() {
    this.router.navigateByUrl("/admin/new-product");
  }

  editProduct(id: string) {
    this.router.navigateByUrl("/admin/update-product/" + id);
  }
}
