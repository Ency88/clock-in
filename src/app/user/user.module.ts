import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UserMonthlyDetailComponent } from './pages/monthly-detail/user-monthly-detail.component';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [CommonModule, UserRoutingModule, LayoutModule, ReactiveFormsModule, MaterialModule, MomentModule],
  declarations: [UserDashboardComponent, UserMonthlyDetailComponent],
})
export class UserModule {}
