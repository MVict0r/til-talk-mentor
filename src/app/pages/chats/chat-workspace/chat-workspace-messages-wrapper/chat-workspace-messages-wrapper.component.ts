import {AfterViewInit, Component, ElementRef, inject, input, OnDestroy, Renderer2, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {ChatsService} from '../../../../data/services/chats.services';
import {ChatInterface, MessageInterface} from '../../../../data/interfaces/chat.interface';
import {debounceTime, firstValueFrom, fromEvent, Subscription} from 'rxjs';

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
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit, OnDestroy {
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)
  chatsService = inject(ChatsService)
  chat = input.required<ChatInterface>()

  resizeSubscription!: Subscription;

  messages = this.chatsService.activeChatMessages

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, message)
    )

    await firstValueFrom(
      this.chatsService.getChatById(this.chat().id)
    )
  }

  ngAfterViewInit() {
    this.resizeFeed()

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.resizeFeed()
        console.log(1)
      })
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
