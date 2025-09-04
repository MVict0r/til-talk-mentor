import { PostSuccessResponseInterface } from '@tt/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postAction } from './actions';

export interface PostState{
  posts: PostSuccessResponseInterface[]
}

export const initialState: PostState = {
  posts: []
}

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
      initialState,
      on(postAction.postLoaded, (state, payload) => {
        return {
          ...state,
          posts: payload.posts
        }
      })
    ),
})
