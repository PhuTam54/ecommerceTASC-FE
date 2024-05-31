import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserComponent } from './page/user/user.component';
import { UsercreateComponent } from './page/UserCreate/UserCreate.component';
import { UserdetailsComponent } from './page/UserDetails/UserDetails.component';
import { FavoriteProductComponent } from './page/favorite-product/favorite-product.component';
import { PaginationModule } from './layout/pagination/pagination.module';
import { ClinicComponent } from './page/clinic/clinic.component';
import { ClinicCreateComponent } from './page/clinic-create/clinic-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    UsercreateComponent,
    UserdetailsComponent,
    FavoriteProductComponent,
    ClinicComponent,
    ClinicCreateComponent
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
