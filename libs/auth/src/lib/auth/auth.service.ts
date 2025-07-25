import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponseInterface } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  private baseURL: string = 'https://icherniakov.ru/yt-course/auth/';

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.accessToken;
  }

  login(payload: { username: string; password: string }): Observable<Object> {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponseInterface>(`${this.baseURL}token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponseInterface>(`${this.baseURL}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponseInterface) {
    this.accessToken = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set('accessToken', this.accessToken);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
