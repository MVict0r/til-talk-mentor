import {Component, HostBinding, input} from '@angular/core';
import {MessageInterface} from '../../../../../data/interfaces/chat.interface';
import {AvatarCircleComponent} from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {
  message = input.required<MessageInterface>()

  @HostBinding("class.is-mine")
  get isMine(){
    return this.message().isMine
  }
}
