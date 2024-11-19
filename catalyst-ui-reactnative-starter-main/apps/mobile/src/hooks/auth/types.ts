export type User = any | null;
export type UserToken = string | null;

export type AuthState = {
  userToken?: UserToken;
  user?: User;
  loading: boolean;
};

export type LogInInput = {
  username: string;
  password: string;
};

export type AuthMethods = {
  logIn?: (data: LogInInput) => Promise<void>;
  logOut?: () => void;
};

export type UseAuthHookOutput = {
  authState: AuthState;
  authMethods: AuthMethods;
};
