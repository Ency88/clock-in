import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import {UserLoginComponent} from './pages/user-login/user-login.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {UserLogoutComponent} from './pages/user-logout/user-logout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'logout',
    component: UserLogoutComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserRoutingModule {}
