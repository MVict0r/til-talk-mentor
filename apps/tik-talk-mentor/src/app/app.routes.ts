import { Routes } from '@angular/router';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent, SearchPageComponent, SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
