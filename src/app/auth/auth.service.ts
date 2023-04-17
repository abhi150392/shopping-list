import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new Subject<User>();
  user = new BehaviorSubject<User>(null);
  // token: string = null;
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: any = localStorage.getItem('userData');
    if (!userData) {
      return;
    }

    const enrolledUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (enrolledUser.token) {
      this.user.next(enrolledUser);
    }
  }
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRxSL1MyObUztrzu939JhxXJjME62Sn2M',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUserAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRxSL1MyObUztrzu939JhxXJjME62Sn2M',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleUserAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleUserAuthentication(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirataionDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirataionDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error Occurred!!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'THis email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'THis email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
    }
    return throwError(errorMessage);
  }
}
