import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostCreateDtoInterface, PostSuccessResponseInterface } from '@tt/data-access';

export const postAction = createActionGroup({
    source: 'post',
    events: {
      'create post': props<{post: PostCreateDtoInterface}>(),
      'post fetch': emptyProps(),
      'post loaded': props<{posts: PostSuccessResponseInterface[]}>(),
    }
})
