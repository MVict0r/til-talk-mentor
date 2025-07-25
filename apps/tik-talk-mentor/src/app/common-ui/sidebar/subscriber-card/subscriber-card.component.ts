import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import {ProfileInterface} from '../../../../../../../libs/profile/src/lib/data';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: ProfileInterface;
}
