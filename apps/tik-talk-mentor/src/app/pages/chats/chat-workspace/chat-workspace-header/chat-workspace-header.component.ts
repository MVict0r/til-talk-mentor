import { Component, input } from '@angular/core';
import {AvatarCircleComponent} from '@tt/common-ui';
import {ProfileInterface} from '@tt/profile';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<ProfileInterface>();
}
