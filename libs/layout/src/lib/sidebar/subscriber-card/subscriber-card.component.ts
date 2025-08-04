import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from 'libs/common-ui/src/lib/pipes';
import { ProfileInterface } from 'libs/data-access/src';

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
