import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    loadChildren: 'src/app/user/user.module#UserModule',
  },
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'user',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
