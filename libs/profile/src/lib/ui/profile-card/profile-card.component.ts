import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from 'libs/common-ui/src';
import { ProfileInterface } from 'libs/data-access/src';

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
