import {Component, inject, input, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {ChatsService} from '../../../../data/services/chats.services';
import {ChatInterface, MessageInterface} from '../../../../data/interfaces/chat.interface';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService)
  chat = input.required<ChatInterface>()

  messages = signal<MessageInterface[]>([])

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, message)
    )

    const chat = await firstValueFrom(
      this.chatsService.getChatById(this.chat().id)
    )

    this.messages.set(chat.messages)
  }
}
