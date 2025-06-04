import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileInterface} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  private baseURL: string = 'https://icherniakov.ru/yt-course/';

  getTestsAccount() {
    return this.http.get<ProfileInterface[]>(`${this.baseURL}account/test_accounts`)
  }
}

