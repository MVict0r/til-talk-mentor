import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ChatWorkspaceMessageComponent } from '../../../feature-chats-workspace';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import { ChatsService } from 'libs/data-access/src/lib/services';
import {
  ChatInterface,
  MessageInterface,
} from 'libs/data-access/src/lib/interfaces';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, DatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent
  implements AfterViewInit, OnDestroy
{
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  chatsService = inject(ChatsService);
  chat = input.required<ChatInterface>();

  resizeSubscription!: Subscription;

  messages = this.chatsService.activeChatMessages;

  groupedChatMessages = computed(() => {
    const messages = this.messages();

    const grouped: Record<string, MessageInterface[]> = {};

    messages.forEach((msg) => {
      const dateKey = new Date(msg.createdAt).toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });

    return Object.entries(grouped).map(([date, messages]) => ({
      date,
      messages,
    }));
  });

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, message)
    );

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  ngAfterViewInit() {
    this.resizeFeed();

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.resizeFeed();
        console.log(1);
      });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
