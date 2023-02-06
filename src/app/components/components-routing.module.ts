import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../ui/dashboard/dashboard.component";
import {AuthGuard} from "../auth/auth.guard";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductsComponent} from "./products/products.component";
import {ProducteditorComponent} from "./products/producteditor/producteditor.component";
import {ProductService} from "../services/product.services";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../auth/interceptors/token.interceptor";
import {AuthInterceptor} from "../auth/interceptors/auth.interceptor";


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] ,
    children: [  { path: 'categories',      component: CategoriesComponent  },
                 { path: 'products',      component: ProductsComponent    ,canActivate: [AuthGuard] },


                  { path: 'products/page/:page',      component: ProductsComponent      ,canActivate: [AuthGuard]},
                  { path: 'products/edit',      component: ProducteditorComponent     ,canActivate: [AuthGuard] },
                  { path: 'products/edit/:id',      component: ProducteditorComponent     ,canActivate: [AuthGuard]},

          ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class ComponentsRoutingModule { }

