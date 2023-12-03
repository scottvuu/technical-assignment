import { User } from "./user";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  User: User;
  Comments?: Comment[]
};

export type Comment = {
  id: string;
  parentCommentId?: string;
  content: string;
  createdAt: string;
  User: User;
};

export type AddCommentPayload = Partial<Comment> & {
  postId: string;
};

export type RemoveCommentPayload = {
  postId: string;
  commentId: string
};

export type UpdateCommentPayload = {
  postId: string;
  commentId: string
  content: string
};