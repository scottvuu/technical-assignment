import { createSelector } from '@reduxjs/toolkit';
import { PostState } from 'src/store/slices/post';
import { RootState } from '..';

export const postState = (state: RootState) => state.post;

export const postsSelector = createSelector(postState, (state: PostState) => state.posts);
