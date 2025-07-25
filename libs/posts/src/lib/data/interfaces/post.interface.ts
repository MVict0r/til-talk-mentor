import {ProfileInterface} from '../../../../../profile/src/lib/data';

export interface PostCreateDtoInterface {
  title: string;
  content: string;
  authorId: number;
}

export interface PostSuccessResponseInterface {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: ProfileInterface;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: CommentInterface[];
}

export interface CommentInterface {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDtoInterface {
  text: string;
  authorId: number;
  postId: number;
}
