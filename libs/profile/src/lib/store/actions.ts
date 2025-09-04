import { createActionGroup, props } from '@ngrx/store';
import { ProfileInterface } from '@tt/data-access';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'profiles loaded': props<{profiles: ProfileInterface[]}>(),
  }
})
