import { createActionGroup, props } from '@ngrx/store';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter event': props<{filters: Record<string, any>}>()
  }
})
