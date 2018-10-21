import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'login',
    component: SigninComponent,
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
