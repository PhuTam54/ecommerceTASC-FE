import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PreloaderComponent } from './layout/preloader/preloader.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FavoriteProductComponent } from './pages/favorite-product/favorite-product.component';
import { PaginationModule } from './layout/pagination/pagination.module';
import { ClinicComponent } from './pages/clinic/clinics/clinics.component';
import { ClinicCreateComponent } from './pages/clinic/clinic-create/clinic-create.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { CategoryComponent } from './pages/category/categories/category.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { UserComponent } from './pages/user/users/user.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductsComponent } from './pages/product/products/product.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
    UserComponent,
    UserDetailComponent,
    FavoriteProductComponent,
    ClinicComponent,
    ClinicCreateComponent,
    UserDetailComponent,
    CategoryComponent,
    CategoryDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
