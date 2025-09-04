import { createSelector } from '@ngrx/store';
import { postsFeature } from './reducer';
import { PostSuccessResponseInterface } from '@tt/data-access';

export const selectedPost = createSelector(
  postsFeature.selectPosts,
  (posts: PostSuccessResponseInterface[]) => posts
)
