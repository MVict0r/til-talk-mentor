import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChatInterface,
  ChatListInterface,
  MessageInterface,
} from '../interfaces/chat.interface';
import { map } from 'rxjs';
import {ProfileService} from '../../../../../../libs/profile/src/lib/data';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<MessageInterface[]>([]);

  baseUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseUrl}chat/`;
  messagesUrl = `${this.baseUrl}message/`;

  createChat(userId: number) {
    return this.http.post<ChatInterface>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<ChatListInterface[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<ChatInterface>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        // TODO нужно логику группировки сообщений по датам перенести в сервис

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<MessageInterface>(
      `${this.messagesUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
