import { createSelector } from '@reduxjs/toolkit';
import { UserState } from 'src/store/slices/user';
import { RootState } from '..';

export const userState = (state: RootState) => state.user;

export const usersSelector = createSelector(userState, (state: UserState) => state.users);
export const userSelector = createSelector(userState, (state: UserState) => state.user);
