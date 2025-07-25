import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {ProfileInterface} from '../../../../../../libs/profile/src/lib/data';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: ProfileInterface;
}
