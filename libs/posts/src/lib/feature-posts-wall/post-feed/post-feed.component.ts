import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy, OnInit,
  Renderer2
} from '@angular/core';
import { PostComponent } from '../post/post.component';
import {
  debounceTime,
  firstValueFrom,
  fromEvent,
  Subscription,
} from 'rxjs';
import { PostInputComponent } from '../../ui';
import { Store } from '@ngrx/store';
import { postAction, selectedPost } from '../../store';
import { PostService, ProfileInterface } from '@tt/data-access';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit, OnDestroy, OnInit {
  postService = inject(PostService);
  store = inject(Store)
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  // feed = this.postService.posts;
  feed = this.store.selectSignal(selectedPost)

  profile = input<ProfileInterface>();


  resizeSubscription!: Subscription;

  constructor() {
    // firstValueFrom(this.postService.fetchPost());
  }

  ngOnInit(): void {
    this.store.dispatch(postAction.postFetch())
  }

  ngAfterViewInit() {
    this.resizeFeed();

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.resizeFeed();
        console.log(1);
      });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(
      this.postService.createPost({
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      })
    );
  }
}
