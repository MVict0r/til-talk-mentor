import {Component, inject, input, OnInit, signal} from '@angular/core';
import {CommentInterface, PostSuccessResponseInterface} from '../../../data/interfaces/post.interface';
import {AvatarCircleComponent} from '../../../common-ui/avatar-circle/avatar-circle.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from '../comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {CustomDatePipe} from '../../../helpers/pipes/custom-date.pipe';
import {ProfileInterface} from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    CustomDatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post = input<PostSuccessResponseInterface>();
  profile = input<ProfileInterface>();

  comments = signal<CommentInterface[]>([])

  postService = inject(PostService)

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(this.postService.createComment({
      text: commentText,
      authorId: this.profile()!.id,
      postId: this.post()!.id
    })).then(async () => {
      const comments = await firstValueFrom(
        this.postService.getCommentsByPostId(this.post()!.id)
      )
      this.comments.set(comments);
    }).catch(err => {
      console.log("Error create comment", err);
    })

  }

}
