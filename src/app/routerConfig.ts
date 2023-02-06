import { Routes } from '@angular/router';
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {DashboardComponent} from "./ui/dashboard/dashboard.component";
import {ErrorsComponent} from "./ui/errors/errors.component";


const appRoutes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: '404',  component: ErrorsComponent},

  { path: 'login', component: LoginComponent },
  {path: '**', redirectTo: '404'}



];
export default appRoutes;
