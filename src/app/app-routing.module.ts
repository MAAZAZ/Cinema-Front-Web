import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CinemaComponent} from "./cinema/cinema.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {
    path: "",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path: "cinema",
    component: CinemaComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
