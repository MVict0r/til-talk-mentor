import {ProfileInterface} from './profile.interface';

export interface ChatInterface {
  id: number,
  userFirst: ProfileInterface,
  userSecond: ProfileInterface,
  messages: MessageInterface[]
}

export interface MessageInterface {
  id: number,
  userFromId: number,
  personalChatId: number,
  text: string,
  createdAt: string,
  isRead: boolean,
  updatedAt: string,
}
