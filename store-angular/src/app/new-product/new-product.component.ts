import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup! : FormGroup;
  isEdit : boolean = false;
  product! : Product;
  buttonName : string = "Add";
  constructor(private fb : FormBuilder, private productService : ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(null, [Validators.required, Validators.min(1), Validators.pattern("[0-9]+")]),
      quantity : this.fb.control(null, Validators.required),
    })
  }

  addroduct() {
    let product = this.productFormGroup.value;
    this.productService.addProduct(product).subscribe({
      next : value => {
        alert("Product added successfuly")
        this.productFormGroup.reset();
      }, error : err => {

      }
    })
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors) {
    if(errors['required']){
      return fieldName + " is required"
    }else if (errors['minlength']){
      return fieldName + " should have at least " + errors['minlength']['requiredLength'] + " characters";
    }else if (errors['pattern']){
      return fieldName + " should be a number";
    }else if (errors['min']){
      return fieldName + " should be a superior then " + errors['min']['min'];
    }else {
      return "";
    }
  }
}

@Component({
  selector: 'app-update-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productFormGroup! : FormGroup;
  productId! : string;
  product! : Product;
  isEdit : boolean = true;
  buttonName : string = "Update";

  constructor(private fb : FormBuilder,
              private productService : ProductsService,
              private route : ActivatedRoute) {
    this.productId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next : product =>{
        this.product = product;
        this.productFormGroup = this.fb.group({
          name : this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price : this.fb.control(this.product.price, [Validators.required, Validators.min(1), Validators.pattern("[0-9]+")]),
          quantity : this.fb.control(this.product.quantity, Validators.required),
        });
      }, error : err => {
        console.log(err);
      }
    })

  }

  addroduct() {
    let product : Product = this.productFormGroup.value;
    product.id = this.productId;
    this.productService.updateProduct(product).subscribe({
      next : value => {
        alert("Product updated with success");
      }
    })
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors) {
    if(errors['required']){
      return fieldName + " is required"
    }else if (errors['minlength']){
      return fieldName + " should have at least " + errors['minlength']['requiredLength'] + " characters";
    }else if (errors['pattern']){
      return fieldName + " should be a number";
    }else if (errors['min']){
      return fieldName + " should be a superior then " + errors['min']['min'];
    }else {
      return "";
    }
  }
}
