import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserMonthlyDetailComponent } from './pages/monthly-detail/user-monthly-detail.component';
import {UserEditWorktimeComponent} from './pages/monthly-detail/edit-worktime/user-edit-worktime.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'monthly-detail',
    children: [
      {
        path: '',
        component: UserMonthlyDetailComponent,
      },
      {
        path: 'edit/:date',
        component: UserEditWorktimeComponent,
      }
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserRoutingModule {}
