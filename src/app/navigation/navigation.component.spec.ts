import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation.component';
import {
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        RouterTestingModule,
        MatGridListModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
      ],
      declarations: [NavigationComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
