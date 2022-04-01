import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product/product.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path : 'product', component: ProductComponent},
  {path : 'signUp', component: SignUpComponent, data: {title: 'Register'}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
