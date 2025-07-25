import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {AvatarCircleComponent} from '@tt/common-ui';
import {ProfileInterface} from '@tt/profile';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<ProfileInterface>();
}
