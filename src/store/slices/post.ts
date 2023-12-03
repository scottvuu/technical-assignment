import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, RemoveCommentPayload, UpdateCommentPayload } from "models/post";
import Mockup from "data.json";
import { findById } from "utils/data";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "models/post";
import { AddCommentPayload } from "models/post";

export type PostState = {
  posts: Post[];
};

export type postReducer = {
  setPosts: (state: PostState, action: PayloadAction<Post[]>) => void;
  addComment: (
    state: PostState,
    action: PayloadAction<AddCommentPayload>
  ) => void;
  removeComment: (
    state: PostState,
    action: PayloadAction<RemoveCommentPayload>
  ) => void;
  updateComment: (
    state: PostState,
    action: PayloadAction<UpdateCommentPayload>
  ) => void;
};

const postSlice = createSlice<PostState, postReducer>({
  name: "post",
  initialState: {
    posts: Mockup.posts,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addComment: (state, action) => {
      const { postId, ...commentPayload } = action.payload;
      const comment = {
        ...commentPayload,
        id: uuidv4(),
        createdAt: new Date()?.toISOString(),
      } as Comment;
      const post = findById(state.posts, postId);
      if (post) {
        post.Comments = [comment, ...(post.Comments || [])];
      }
    },
    removeComment: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = findById(state.posts, postId);
      if (post) {
        post.Comments = (post.Comments || []).filter(
          (comment) => comment.id !== commentId
        );
      }
    },
    updateComment: (state, action) => {
      const { postId, commentId, content } = action.payload;
      const post = findById(state.posts, postId);
      if (post) {
        post.Comments = (post.Comments || []).map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        );
      }
    },
  },
});

export const { addComment, removeComment, updateComment } = postSlice.actions;
export default postSlice.reducer;
