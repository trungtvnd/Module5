import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormRegisterComponent} from "./form-register/form-register.component";
import {FormLoginComponent} from "./form-login/form-login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'register', component: FormRegisterComponent},
  {path: 'login', component: FormLoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
