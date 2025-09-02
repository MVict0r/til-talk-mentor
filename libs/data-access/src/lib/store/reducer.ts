import { ProfileInterface } from '@tt/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profiles: ProfileInterface[],
  profileFilters: Record<string, any>
}

export const initialState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.filterEvent, (state, payload) => {
      reeturn {
        ...state,
          profiles: payload.profiles
      }
})
  )
})
