import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AboutComponent } from 'src/app/about/about.component';
import { AdminDashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from 'src/app/user/dashboard/dashboard.component';
import { ForgotPasswordComponent } from 'src/app/user/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/user/login/login.component';
import { SignupComponent } from 'src/app/user/signup/signup.component';

import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
