import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import {ProfileInterface} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me);
  subscriptions$: Observable<ProfileInterface[]> = this.profileService.getSubscribersShortList(5)

  profiles$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )
}
