import {AfterViewInit, Component, ElementRef, HostListener, inject, input, OnDestroy, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent, Subscription, take, takeUntil} from 'rxjs';
import {ProfileInterface} from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements AfterViewInit, OnDestroy {
  postService = inject(PostService);
  feed = this.postService.posts

  profile = input<ProfileInterface>()

  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  resizeSubscription!: Subscription;

  constructor() {
    firstValueFrom(
      this.postService.fetchPost()
    )
  }

  ngAfterViewInit() {
    this.resizeFeed()

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.resizeFeed()
        console.log(1)
      })
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: postText,
      authorId: this.profile()!.id
    }))
  }
}
