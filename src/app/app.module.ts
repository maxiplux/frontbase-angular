import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HeaderComponent } from './ui/header/header.component';
import { ContentComponent } from './ui/content/content.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SideBarComponent } from './ui/side-bar/side-bar.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import appRoutes from "./routerConfig";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth/auth.guard";
import { LoginComponent } from './auth/login/login.component';
import {ComponentsRoutingModule} from "./components/components-routing.module";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {TokenInterceptor} from "./auth/interceptors/token.interceptor";
import {AuthInterceptor} from "./auth/interceptors/auth.interceptor";
import {ProductService} from "./services/product.services";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    SideBarComponent,
    ProductsComponent,
    CategoriesComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComponentsRoutingModule,
    RouterModule.forRoot(appRoutes), FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,ProductService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
