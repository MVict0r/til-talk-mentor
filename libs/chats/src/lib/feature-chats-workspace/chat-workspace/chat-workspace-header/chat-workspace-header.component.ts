import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from 'libs/common-ui/src/lib/components';
import { ProfileInterface } from 'libs/data-access/src/lib/interfaces';

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
