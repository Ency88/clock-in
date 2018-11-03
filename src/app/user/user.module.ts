import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TimeComponentComponent } from './pages/time-component/time-component.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule, LayoutModule, ReactiveFormsModule, MaterialModule],
  declarations: [UserDashboardComponent, TimeComponentComponent],
})
export class UserModule {}
