import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../ui/dashboard/dashboard.component";
import {AuthGuard} from "../auth/auth.guard";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductsComponent} from "./products/products.component";


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] ,
    children: [  { path: 'categories',      component: CategoriesComponent   ,canActivate: [AuthGuard] },
                 { path: 'products',      component: ProductsComponent    ,canActivate: [AuthGuard]}
          ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
