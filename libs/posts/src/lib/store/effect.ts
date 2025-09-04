import { inject, Injectable } from '@angular/core';
import { PostService } from '@tt/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postAction } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  fetchPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postAction.postFetch),
      switchMap(() => {
        return this.postService.fetchPost();
      }),
      map(posts => postAction.postLoaded({ posts: posts }))
    );
  })
}
