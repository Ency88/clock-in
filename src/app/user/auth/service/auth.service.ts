import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private fireAuth: AngularFireAuth) {
  }

  signupUser(email: string, password: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(
        error => {
          alert(error);
        }
      );
  }

  signinUser(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          this.fireAuth.auth.currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => {
          alert(error);
        }
      );
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.token = null;
  }

  getToken() {
    this.fireAuth.auth.currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
