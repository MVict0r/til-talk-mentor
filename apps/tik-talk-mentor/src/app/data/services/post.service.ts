import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDtoInterface,
  CommentInterface,
  PostCreateDtoInterface,
  PostSuccessResponseInterface,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  baseUrl: string = 'https://icherniakov.ru/yt-course/';

  posts = signal<PostSuccessResponseInterface[]>([]);

  createPost(payload: PostCreateDtoInterface) {
    return this.#http
      .post<PostSuccessResponseInterface>(`${this.baseUrl}post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPost();
        })
      );
  }

  createComment(payload: CommentCreateDtoInterface) {
    return this.#http.post<CommentInterface>(
      `${this.baseUrl}comment/`,
      payload
    );
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<PostSuccessResponseInterface>(`${this.baseUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }

  fetchPost() {
    return this.#http
      .get<PostSuccessResponseInterface[]>(`${this.baseUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }
}
