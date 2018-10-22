import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';
import { AuthGuardLoggedOutService } from '../services/auth-guard-logged-out.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [AuthGuardLoggedOutService],
  },
  {
    path: 'logout',
    component: UserLogoutComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserRoutingModule {}
