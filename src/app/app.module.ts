import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthGuard } from './services/guards/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './ui/login/login.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import {TimeLoggerService} from './services/time.logger.service';


@NgModule({
  declarations: [AppComponent, NavigationComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    LayoutModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AuthService, TimeLoggerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
