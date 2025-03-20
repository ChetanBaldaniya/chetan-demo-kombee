import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  userDetails: AuthState;
};
type AuthState = {
  isLogin: boolean;

  userData: UserDetailsType | null;
  provider?: string;
};

type UserDetailsType = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  picture: string;

  provider?: string;
  token?: string;
};
const initialState = {
  userDetails: {
    isLogin: false,
    userData: null,
  } as AuthState,
} as InitialStateType;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (_, action: PayloadAction<any>) => {
      return {
        userDetails: {
          isLogin: true,
          userData: action?.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;

