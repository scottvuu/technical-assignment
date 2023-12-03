import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserWithoutId } from "models/user";
import { hash } from "utils/encryptDecrypt";
import { v4 as uuidv4 } from "uuid";
import Mockup from "data.json";

export type UserState = {
  users: User[];
  user?: User; // Login user
};

export type UserReducer = {
  setUsers: (state: UserState, action: PayloadAction<User[]>) => void;
  addUser: (state: UserState, action: PayloadAction<UserWithoutId>) => void;
  login: (state: UserState, action: PayloadAction<User>) => void;
};

const userSlice = createSlice<UserState, UserReducer>({
  name: "user",
  initialState: {
    users: Mockup.users,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      const user = {
        ...action.payload,
        id: uuidv4(),
        password: hash(action.payload.password!).hashed,
      };
      state.users = [...state.users, user];
      console.log("user", user);

      state.user = user;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser, login } = userSlice.actions;
export default userSlice.reducer;
