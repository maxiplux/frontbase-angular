import { Routes } from '@angular/router';
import {CategoriesComponent} from "./components/categories/categories.component";
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {DashboardComponent} from "./ui/dashboard/dashboard.component";


const appRoutes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },


];
export default appRoutes;
