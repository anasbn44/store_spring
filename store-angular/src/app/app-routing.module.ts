import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NewProductComponent, UpdateProductComponent} from "./new-product/new-product.component";
import {UserTemplateComponent} from "./user-template/user-template.component";

const routes : Routes = [
  {path : "", component : UserTemplateComponent},
  {path : "login", component : LoginComponent},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthenticationGuard],
    children : [
      {path : "products", component : ProductsComponent},
      {path : "customers", component : CustomersComponent},
      {path : "new-product", component : NewProductComponent},
      {path : "update-product/:id", component : UpdateProductComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutingModule { }
