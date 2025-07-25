import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {ProfileInterface, ProfileService} from '@tt/profile';
import {SvgIconComponent} from '@tt/common-ui';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);

  subscriptions$: Observable<ProfileInterface[]> =
    this.profileService.getSubscribersShortList(3);
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
}
