import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import {PostFeedComponent} from '@tt/posts';
import {
  ProfileHeaderComponent
} from '../../../../../../apps/tik-talk-mentor/src/app/common-ui/profile-header/profile-header.component';
import {ChatsService} from '../../../../../../apps/tik-talk-mentor/src/app/data/services/chats.services';
import {ProfileInterface, ProfileService} from '../../data';
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isMyPage = signal(false);

  me$ = toObservable(this.profileService.me);
  subscriptions$: Observable<ProfileInterface[]> =
    this.profileService.getSubscribersShortList(5);

  profiles$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
