import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HoursMinutesSeconds } from './shared/pipes/hours.minutes.seconds.pipe';
import { UserMonthlyDetailComponent } from './pages/monthly-detail/user-monthly-detail.component';
import { TimeLoggerComponent } from './components/time-logger/time-logger.component';
import { SignTheMonthDialogComponent } from './components/sign-the-month-dialog/sign-the-month-dialog.component';
import {UserEditWorktimeComponent} from './pages/monthly-detail/edit-worktime/user-edit-worktime.component';
import {UserMonthlyDetailService} from './pages/monthly-detail/user-monthly-detail.service';

@NgModule({
  imports: [CommonModule, UserRoutingModule, LayoutModule, ReactiveFormsModule, MaterialModule,
    FormsModule],
  entryComponents: [SignTheMonthDialogComponent],
  declarations: [
    UserDashboardComponent,
    HoursMinutesSeconds,
    UserMonthlyDetailComponent,
    UserEditWorktimeComponent,
    TimeLoggerComponent,
    SignTheMonthDialogComponent
  ],
  providers: [UserMonthlyDetailService]
})
export class UserModule {}
