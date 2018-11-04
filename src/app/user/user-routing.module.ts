import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { TimeLoggerComponent } from './pages/time-logger/time-logger.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'time-logger',
    component: TimeLoggerComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserRoutingModule {}
