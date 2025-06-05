import {Component, inject, OnInit} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {ProfileInterface} from '../../data/interfaces/profile.interface';
import {firstValueFrom, from, map, Observable, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, RouterLink, RouterLinkActive, SubscriberCardComponent, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService)

  subscriptions$: Observable<ProfileInterface[]> = this.profileService.getSubscribersShortList()
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
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

  constructor() {
    let a = 0

    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
      map(res => res * 2),
      tap(res => {
        a = res - 1;
        console.log('tap: ', a);
      })
    ).subscribe(
      res => {
        console.log("subscribe: ", res);
      }
    )
  }
}
