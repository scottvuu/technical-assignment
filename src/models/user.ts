export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  name?: string;
  avatarUrl?: string;
};

export type UserWithoutId = Omit<User, "id">;
export type UserLoginPayload = Pick<User, "username" | "password">;
