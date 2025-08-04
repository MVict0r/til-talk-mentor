import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {CommentComponent, PostInputComponent} from '../../ui';
import {
  AvatarCircleComponent,
  SvgIconComponent,
} from 'libs/common-ui/src/lib/components';
import { CustomDatePipe } from 'libs/common-ui/src/lib/pipes';
import {
  CommentInterface,
  PostService,
  PostSuccessResponseInterface,
  ProfileInterface,
} from 'libs/data-access/src';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    CustomDatePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<PostSuccessResponseInterface>();
  profile = input<ProfileInterface>();

  comments = signal<CommentInterface[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    )
      .then(async () => {
        const comments = await firstValueFrom(
          this.postService.getCommentsByPostId(this.post()!.id)
        );
        this.comments.set(comments);
      })
      .catch((err) => {
        console.log('Error create comment', err);
      });
  }
}
