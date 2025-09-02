import { Routes } from '@angular/router';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent, SearchPageComponent, SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects, profileFeature } from '@tt/data-access';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
