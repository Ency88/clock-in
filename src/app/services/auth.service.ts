import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  constructor(private router: Router, private fireAuth: AngularFireAuth) {
    this.user = fireAuth.user;
  }

  login(email: string, password: string): Observable<any> {
    return from(this.fireAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<any> {
    return from(this.fireAuth.auth.signOut());
  }

  getCurrentUser(): Observable<any> {
    return this.user;
  }
}
