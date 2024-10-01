import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type User = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | User;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      try {
        const decodedToken: User = JSON.parse(atob(token.split(".")[1]));
        state.user = {
          userId: decodedToken.userId,
          role: decodedToken.role,
          iat: decodedToken.iat,
          exp: decodedToken.exp,
        };
        state.token = token;
      } catch (error) {
        console.error("Invalid token format", error);
        state.user = null;
        state.token = null;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
