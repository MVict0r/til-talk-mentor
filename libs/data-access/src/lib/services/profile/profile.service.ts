import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { GlobalStoreService } from '../global-store/global-store.service';
import { PagebleInterface, ProfileInterface } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseURL: string = 'https://icherniakov.ru/yt-course/';
  #globalStoreService = inject(GlobalStoreService)
  me = signal<ProfileInterface | null>(null);
  filteredProfiles = signal<ProfileInterface[]>([]);

  getTestsAccount() {
    return this.http.get<ProfileInterface[]>(
      `${this.baseURL}account/test_accounts`
    );
  }

  getMe() {
    return this.http
      .get<ProfileInterface>(`${this.baseURL}account/me`)
      .pipe(tap(
        (res) => {
          this.me.set(res)
          this.#globalStoreService.me.set(res)
        }));
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${this.baseURL}account/${id}`);
  }

  getSubscribersShortList(subsAmount: number = 6) {
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseURL}account/subscribers/?page=1&size=${subsAmount}`
      )
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<ProfileInterface>) {
    return this.http.patch<ProfileInterface>(
      `${this.baseURL}account/me`,
      profile
    );
  }

  uploadAvatar(file: File) {
    const fd: FormData = new FormData();
    fd.append('image', file);

    return this.http.post<ProfileInterface>(
      `${this.baseURL}account/upload_image`,
      fd
    );
  }

  filterProfile(params: Record<string, any>) {
    return this.http
      .get<PagebleInterface<ProfileInterface>>(
        `${this.baseURL}account/accounts`,
        {
          params,
        }
      )
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
