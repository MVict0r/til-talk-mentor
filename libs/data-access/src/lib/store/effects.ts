import { inject, Injectable } from '@angular/core';
import { ProfileService } from '@tt/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)

  filterProfile = createEffect(() => {
    this.actions$.pipe(
      ofType(profileActions.filterEvent),
      switchMap(({filters}) => {
        return this.profileService.filteredProfiles(formValue)
      })
    )
  })
}
