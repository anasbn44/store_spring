import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products! : Product[];
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  constructor(public productsService : ProductsService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null),
    })
    this.getAllProducts();
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
    let key = this.searchFormGroup.value.keyword;
    this.productsService.searchProducts(key).subscribe({
      next : data => {
        this.products = data;
      }
    })
  }
}
