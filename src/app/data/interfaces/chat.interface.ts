import {ProfileInterface} from './profile.interface';

export interface ChatInterface {
  id: number
  userFirst: ProfileInterface
  userSecond: ProfileInterface
  messages: MessageInterface[]
  companion?: ProfileInterface
}

export interface MessageInterface {
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: boolean
  updatedAt: string
  user?: ProfileInterface
  isMine?: boolean
}

export interface ChatListInterface {
  id: number
  userFrom: ProfileInterface
  message: string
  createdAt: string
  unreadMessages: number
}
