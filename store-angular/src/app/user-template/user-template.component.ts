import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {

  constructor(private productService : ProductsService,
              public authService : AuthenticationService,
              ) { }

  ngOnInit(): void {
  }

  logout() {

  }
}
