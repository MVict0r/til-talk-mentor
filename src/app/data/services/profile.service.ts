import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileInterface} from '../interfaces/profile.interface';
import {PagebleInterface} from '../interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  private baseURL: string = 'https://icherniakov.ru/yt-course/';
  me = signal<ProfileInterface | null>(null)

  getTestsAccount() {
    return this.http.get<ProfileInterface[]>(`${this.baseURL}account/test_accounts`)
  }

  getMe(){
    return this.http.get<ProfileInterface>(`${this.baseURL}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getSubscribersShortList(subsAmount = 5){
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseURL}account/subscribers/?page=1&size=5`)
      .pipe(
        map(res => res.items.slice(1, subsAmount))
      )
  }
}

