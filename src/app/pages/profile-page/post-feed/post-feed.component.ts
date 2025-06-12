import {AfterViewInit, Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../data/services/post.service';
import {debounceTime, firstValueFrom, fromEvent, take} from 'rxjs';

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
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  feed = this.postService.posts

  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  @HostListener('window:resize')
  onWindowResize() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
      )
      .subscribe(() => {
        this.resizeFeed()
        console.log(1)
      })
  }



  constructor() {
    firstValueFrom(
      this.postService.fetchPost()
    )

      const daTe = new Date()
      const createdDate = new Date("2025-06-11T10:48:55.130519");

      console.log('1daTe', daTe);
      console.log('2Date', createdDate);

  }

  ngAfterViewInit() {
    this.resizeFeed()
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
