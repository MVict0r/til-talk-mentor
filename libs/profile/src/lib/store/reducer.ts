import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';
import { ProfileInterface } from '@tt/data-access';

export interface ProfileState {
  profiles: ProfileInterface[],
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles
      }
    })
  )
})
