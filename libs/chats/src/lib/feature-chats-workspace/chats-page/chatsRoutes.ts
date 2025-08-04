import { Route } from '@angular/router';
import { ChatsPageComponent } from './chats.component';
import { ChatWorkspaceComponent } from '../../feature-chats-workspace';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
