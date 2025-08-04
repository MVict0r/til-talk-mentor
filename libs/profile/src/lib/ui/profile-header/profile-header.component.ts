import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components';
import { ImgUrlPipe } from 'libs/common-ui/src/lib/pipes';
import { ProfileInterface } from 'libs/data-access/src';

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
