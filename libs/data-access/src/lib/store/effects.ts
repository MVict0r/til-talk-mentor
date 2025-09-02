import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap } from 'rxjs';
import { ProfileService } from '../services/profile/profile.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)

  filterProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({filters}) => {
        return this.profileService.filterProfile(filters)
      }),
      map(res => profileActions.profilesLoaded({profiles:res.items}))
    )
  })
}
