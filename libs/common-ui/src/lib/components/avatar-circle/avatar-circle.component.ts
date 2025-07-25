import { Component, input } from '@angular/core';
import {ImgUrlPipe} from '../../../../../../apps/tik-talk-mentor/src/app/helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-avatar-circle',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
