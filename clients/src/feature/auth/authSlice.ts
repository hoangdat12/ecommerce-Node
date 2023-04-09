import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService, { iLoginUser, iRegisterUser } from './authService';

export interface iUser {
  _id: string;
  fullName: string;
  photoUrl: string;
  email: string;
}

export interface iAuthState {
  user: iUser | null;
  token: string | null;
  isError: boolean | null;
  isLoading: boolean;
  isSuccess: boolean | null;
}

const initialState: iAuthState = {
  user: null,
  token: null,
  isError: null,
  isLoading: false,
  isSuccess: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userRegister: iRegisterUser, thunkAPI) => {
    try {
      return await authService.register(userRegister);
    } catch (err: any) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userLogin: iLoginUser, thunkAPI) => {
    try {
      return await authService.login(userLogin);
    } catch (err: any) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = null;
      state.isSuccess = null;
      state.isLoading = false;
      state.user = null;
      state.token = null;
    },
    signIn: (state, actions) => {
      (state.user = actions.payload.user),
        (state.token = actions.payload.token);
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = actions.payload.user;
        state.token = actions.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.token = null;
      });
  },
});

export const { reset, signIn, signOut } = authSlice.actions;

// Export initialState to use useAppSelector
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
