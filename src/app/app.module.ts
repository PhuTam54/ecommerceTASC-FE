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
import { DepartmentComponent } from './pages/department/department.component';
import { PositionComponent } from './pages/position/position.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserComponent } from './pages/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
    UserComponent,
    DepartmentComponent,
    PositionComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
