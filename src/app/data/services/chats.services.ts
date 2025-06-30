import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatInterface, MessageInterface} from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient)

  baseUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseUrl}chat/`
  messagesUrl = `${this.baseUrl}message/`

  createChat(userId: number){
    return this.http.post<ChatInterface>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get(`${this.chatsUrl}get_my_chats/`)
  }

  getChatById(chatId: number){
    return this.http.get<ChatInterface>(`${this.chatsUrl}${chatId}`)
  }

  sendMessage(chatId: number, message: string){
    return this.http.post<MessageInterface>(`${this.messagesUrl}${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
