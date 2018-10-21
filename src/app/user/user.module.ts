import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UserDashboardComponent, UserLoginComponent, UserLogoutComponent],
})
export class UserModule {}
