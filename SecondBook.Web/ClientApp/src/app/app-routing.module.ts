import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { BrowseComponent } from './browse/browse.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AdminDashboardComponent } from './account/admin-dashboard/admin-dashboard.component';
import { BookDetailsComponent } from './browse/book-details/book-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'browse/book-details/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
