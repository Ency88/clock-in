import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TimeLoggerComponent } from './pages/time-logger/time-logger.component';
import { HoursMinutesSeconds } from '../pipes/hours.minutes.seconds.pipe';

@NgModule({
  imports: [CommonModule, UserRoutingModule, LayoutModule, ReactiveFormsModule, MaterialModule],
  declarations: [UserDashboardComponent, TimeLoggerComponent, HoursMinutesSeconds],
})
export class UserModule {}
